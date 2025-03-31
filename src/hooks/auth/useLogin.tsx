
import { useState } from 'react';
import { User, MockUser } from '@/types/auth';
import { MOCK_USERS } from '@/data/mockUsers';
import { toast } from "sonner";
import { useLoginAttempts } from './useLoginAttempts';

export const useLogin = (
  setCurrentUser: (user: User | null) => void, 
  resetSessionTimeout: () => void,
  openMFADialog: () => void
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [pendingLogin, setPendingLogin] = useState<{ email: string, password: string } | null>(null);
  const { checkLoginAttempts, trackFailedAttempt, resetLoginAttempts } = useLoginAttempts();

  // Function to finalize login process
  const finalizeLogin = (user: MockUser) => {
    try {
      // Omit password when storing user data
      const { password, mfaEnabled, ...safeUserData } = user;
      
      // Set user in context
      setCurrentUser(safeUserData);
      
      // Set session data
      resetSessionTimeout();
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
      checkLoginAttempts(email);
      
      // Find user in mock database
      const user = MOCK_USERS.find(u => u.email === email);
      
      if (!user || user.password !== password) {
        trackFailedAttempt(email);
        throw new Error("Email ou senha incorretos.");
      }
      
      // Reset failed login attempts
      resetLoginAttempts(email);
      
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

  const verifyMFA = async (code: string) => {
    if (code === "123456" && pendingLogin) {
      const user = MOCK_USERS.find(u => u.email === pendingLogin.email);
      if (user) {
        finalizeLogin(user);
        setPendingLogin(null);
        return true;
      }
    }
    return false;
  };

  return {
    isLoading,
    login,
    pendingLogin,
    finalizeLogin,
    verifyMFA
  };
};
