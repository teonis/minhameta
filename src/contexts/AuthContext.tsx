
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";
import { User, UserRole, AuthContextType, MockUser } from '@/types/auth';
import { MOCK_USERS, loginAttempts, passwordResetRequests } from '@/data/mockUsers';
import { useMFA } from '@/hooks/useMFA';
import { useSession } from '@/hooks/useSession';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingLogin, setPendingLogin] = useState<{ email: string, password: string } | null>(null);

  // Logout function declaration for dependency in useSession
  const handleLogout = () => {
    setCurrentUser(null);
    sessionManager.clearSession();
    toast.success("Logout realizado com sucesso!");
  };

  // Initialize session manager
  const sessionManager = useSession(handleLogout);

  // Initialize MFA handler
  const { openMFADialog, MFADialog } = useMFA({
    onVerify: async (code) => {
      // In a real application, this would validate against an actual MFA service
      // For demo purposes, we'll accept "123456" as valid
      if (code === "123456") {
        if (pendingLogin) {
          const user = MOCK_USERS.find(u => u.email === pendingLogin.email);
          if (user) {
            finalizeLogin(user);
            setPendingLogin(null);
            return true;
          }
        }
      }
      return false;
    }
  });

  // Check for existing session on component mount
  useEffect(() => {
    const savedUser = sessionManager.restoreSession();
    if (savedUser) {
      setCurrentUser(savedUser);
    }
    setIsLoading(false);
  }, []);

  // Function to finalize login process
  const finalizeLogin = (user: MockUser) => {
    try {
      // Omit password when storing user data
      const { password, mfaEnabled, ...safeUserData } = user;
      
      // Set user in context
      setCurrentUser(safeUserData);
      
      // Set session data
      sessionManager.resetSessionTimeout();
      localStorage.setItem('currentUser', JSON.stringify(safeUserData));
      localStorage.setItem('isLoggedIn', 'true');
      
      setIsLoading(false);
      
      // Log successful login
      console.log(`User logged in: ${safeUserData.email} with role ${safeUserData.role}`);
      
      // Show success message
      toast.success("Login realizado com sucesso!");
    } catch (error) {
      console.error("Erro ao finalizar login:", error);
      setIsLoading(false);
      toast.error("Erro ao processar login. Tente novamente.");
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Check if account is locked due to too many failed attempts
      if (loginAttempts[email]?.lockedUntil && new Date() < loginAttempts[email].lockedUntil!) {
        const remainingMinutes = Math.ceil(
          (loginAttempts[email].lockedUntil!.getTime() - new Date().getTime()) / (60 * 1000)
        );
        throw new Error(`Conta temporariamente bloqueada. Tente novamente em ${remainingMinutes} minutos.`);
      }
      
      // Find user in mock database
      const user = MOCK_USERS.find(u => u.email === email);
      
      if (!user || user.password !== password) {
        // Track failed login attempts
        loginAttempts[email] = loginAttempts[email] || { count: 0 };
        loginAttempts[email].count += 1;
        
        // Lock account after 5 failed attempts
        if (loginAttempts[email].count >= 5) {
          // Lock for 30 minutes
          loginAttempts[email].lockedUntil = new Date(new Date().getTime() + 30 * 60 * 1000);
          throw new Error("Conta bloqueada por tentativas excessivas de login. Tente novamente em 30 minutos.");
        }
        
        throw new Error("Email ou senha incorretos.");
      }
      
      // Reset failed login attempts
      delete loginAttempts[email];
      
      // Check if MFA is required
      if (user.mfaEnabled) {
        setPendingLogin({ email, password });
        openMFADialog();
        setIsLoading(false);
        return;
      }
      
      // Successful login without MFA
      finalizeLogin(user);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    
    try {
      // Check if email already exists
      if (MOCK_USERS.some(u => u.email === email)) {
        throw new Error("Email já cadastrado.");
      }
      
      // Validate password length - new requirement
      if (password.length < 6) {
        throw new Error("Senha deve ter no mínimo 6 caracteres.");
      }
      
      // In a real application, this would add to a database and send verification email
      // For demo, create a new user object with the provided details
      const newUser = {
        id: String(MOCK_USERS.length + 1),
        email,
        password, // In a real app, this would be hashed
        name,
        role,
        isEmailVerified: false, // would be false in real app until verified
        lastActive: new Date(),
        createdAt: new Date(),
        mfaEnabled: false
      };
      
      // Add the new user to our mock database (for demo purposes)
      MOCK_USERS.push(newUser as MockUser);
      
      // Success message
      toast.success("Cadastro realizado com sucesso!");
      
      // For demo purposes, automatically login after registration
      const { password: _, mfaEnabled, ...safeUserData } = newUser;
      
      setCurrentUser(safeUserData);
      localStorage.setItem('currentUser', JSON.stringify(safeUserData));
      localStorage.setItem('isLoggedIn', 'true');
      
      // Set session expiration
      sessionManager.resetSessionTimeout();
      
      setIsLoading(false);
      
      return Promise.resolve();
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    setIsLoading(true);
    
    try {
      // Check if email is in valid format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error("Formato de email inválido.");
      }
      
      // Rate limiting check
      const now = new Date();
      if (passwordResetRequests[email]) {
        const hoursSinceLastRequest = (now.getTime() - passwordResetRequests[email].lastRequestTime.getTime()) / (1000 * 60 * 60);
        
        // If less than 24 hours since last request and already made 3 requests
        if (hoursSinceLastRequest < 24 && passwordResetRequests[email].count >= 3) {
          const hoursRemaining = Math.ceil(24 - hoursSinceLastRequest);
          throw new Error(`Limite de solicitações excedido. Tente novamente em ${hoursRemaining} horas.`);
        }
        
        // If it's been more than 24 hours, reset the count
        if (hoursSinceLastRequest >= 24) {
          passwordResetRequests[email] = { count: 1, lastRequestTime: now };
        } else {
          // Otherwise increment the count
          passwordResetRequests[email].count += 1;
          passwordResetRequests[email].lastRequestTime = now;
        }
      } else {
        // First request for this email
        passwordResetRequests[email] = { count: 1, lastRequestTime: now };
      }
      
      // In a real app, we would:
      // 1. Check if email exists in the database (without revealing this info to the user)
      // 2. Generate a secure token
      // 3. Store the token with expiration time
      // 4. Send email with reset link
      
      // For demo purposes, we'll simulate a successful request
      console.log(`Password reset requested for: ${email}`);
      
      // Simulate delay for API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsLoading(false);
      
      // We don't confirm if the email exists or not to prevent email enumeration
      return Promise.resolve();
    } catch (error: any) {
      setIsLoading(false);
      throw error;
    }
  };

  const updatePassword = async (currentPassword: string, newPassword: string) => {
    // Validate new password
    if (newPassword.length < 6) {
      toast.error("A nova senha deve ter no mínimo 6 caracteres.");
      return Promise.reject(new Error("Senha muito curta."));
    }
    
    // In a real app, we'd validate the current password and update in DB
    toast.success("Senha atualizada com sucesso!");
    return Promise.resolve();
  };

  const logoutAllSessions = async () => {
    try {
      setIsLoading(true);
      
      // In a real app, this would invalidate all tokens in the database
      
      // Clear local session
      localStorage.removeItem('currentUser');
      localStorage.removeItem('sessionExpiresAt');
      localStorage.removeItem('isLoggedIn');
      
      if (sessionManager.sessionTimeout) {
        clearTimeout(sessionManager.sessionTimeout);
      }
      
      setCurrentUser(null);
      setIsLoading(false);
      
      toast.success("Todas as sessões foram encerradas com sucesso!");
      
      return Promise.resolve();
    } catch (error) {
      setIsLoading(false);
      toast.error("Erro ao encerrar sessões. Tente novamente.");
      return Promise.reject(error);
    }
  };

  const hasPermission = (requiredRole: UserRole): boolean => {
    if (!currentUser) return false;
    
    // Role hierarchy check
    switch (currentUser.role) {
      case UserRole.SUPER_ADMIN:
        return true; // Super admin has access to everything
      case UserRole.ADMIN:
        return requiredRole !== UserRole.SUPER_ADMIN;
      case UserRole.PROFESSIONAL:
        return requiredRole === UserRole.PROFESSIONAL || requiredRole === UserRole.PATIENT;
      case UserRole.PATIENT:
        return requiredRole === UserRole.PATIENT;
      default:
        return false;
    }
  };

  const value = {
    currentUser,
    isLoading,
    isAuthenticated: !!currentUser,
    login,
    logout: handleLogout,
    logoutAllSessions,
    register,
    verifyMFA: async (code: string) => {
      if (code === "123456" && pendingLogin) {
        const user = MOCK_USERS.find(u => u.email === pendingLogin.email);
        if (user) {
          finalizeLogin(user);
          setPendingLogin(null);
          return true;
        }
      }
      return false;
    },
    resetPassword,
    updatePassword,
    hasPermission
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      <MFADialog />
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { UserRole };
