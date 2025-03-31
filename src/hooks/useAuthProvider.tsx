
import { useState, useEffect } from 'react';
import { User } from '@/types/auth';
import { useSession } from '@/hooks/useSession';
import { useMFA } from '@/hooks/useMFA';
import { useLogin } from '@/hooks/auth/useLogin';
import { useLogout } from '@/hooks/auth/useLogout';
import { usePasswordReset } from '@/hooks/auth/usePasswordReset';
import { useRegistration } from '@/hooks/auth/useRegistration';

export const useAuthProvider = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize session manager
  const sessionManager = useSession(() => handleLogout());

  // Initialize MFA handler
  const { openMFADialog, MFADialog } = useMFA({
    onVerify: async (code) => {
      return verifyMFA(code);
    }
  });

  // Initialize login handler
  const { 
    login,
    verifyMFA
  } = useLogin(setCurrentUser, sessionManager.resetSessionTimeout, openMFADialog);

  // Initialize logout handler
  const { 
    handleLogout,
    logoutAllSessions
  } = useLogout(setCurrentUser, sessionManager.clearSession);

  // Initialize password reset handler
  const { resetPassword, updatePassword } = usePasswordReset();

  // Initialize registration handler
  const { register } = useRegistration(setCurrentUser, sessionManager.resetSessionTimeout);

  // Check for existing session on component mount
  useEffect(() => {
    const savedUser = sessionManager.restoreSession();
    if (savedUser) {
      setCurrentUser(savedUser);
    }
    setIsLoading(false);
  }, []);

  return {
    currentUser,
    isLoading,
    login,
    handleLogout,
    logoutAllSessions,
    register,
    resetPassword,
    updatePassword,
    verifyMFA,
    MFADialog
  };
};
