
import React, { createContext, useContext } from 'react';
import { User, UserRole, AuthContextType } from '@/types/auth';
import { useAuthProvider } from '@/hooks/useAuthProvider';
import { useAuthorization } from '@/hooks/useAuthorization';

// Create the context with a default undefined value
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Use our custom hook to get all the authentication logic
  const {
    currentUser,
    isLoading,
    login,
    handleLogout: logout,
    logoutAllSessions,
    register,
    resetPassword,
    updatePassword,
    verifyMFA,
    MFADialog
  } = useAuthProvider();

  // Create the context value
  const value: AuthContextType = {
    currentUser,
    isLoading,
    isAuthenticated: !!currentUser,
    login,
    logout,
    logoutAllSessions,
    register,
    verifyMFA,
    resetPassword,
    updatePassword,
    hasPermission: (requiredRole: UserRole): boolean => {
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
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      <MFADialog />
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Export UserRole for convenience
export { UserRole };
