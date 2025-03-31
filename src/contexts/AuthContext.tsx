
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
    verifyRecoveryCode,
    resetPasswordWithCode,
    MFADialog
  } = useAuthProvider();

  // Use the authorization hook
  const { hasPermission: authHasPermission } = useAuthorization();

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
    verifyRecoveryCode,
    resetPasswordWithCode,
    hasPermission: (requiredRole: UserRole) => authHasPermission(currentUser, requiredRole)
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
