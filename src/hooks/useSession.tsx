
import { useCallback } from 'react';
import { toast } from 'sonner';
import { useSessionCore } from './session/useSessionCore';
import { useActivityTracking } from './session/useActivityTracking';

export const useSession = (onLogout: () => void) => {
  // Create a wrapped logout function that shows a toast
  const handleSessionExpired = useCallback(() => {
    onLogout();
    toast.info("Sua sessão expirou por inatividade. Por favor, faça login novamente.");
  }, [onLogout]);
  
  // Initialize core session functionality
  const sessionCore = useSessionCore(handleSessionExpired);
  
  // Initialize activity tracking
  const checkForActiveSession = useCallback(() => {
    return localStorage.getItem('currentUser') !== null;
  }, []);
  
  useActivityTracking(
    checkForActiveSession,
    sessionCore.resetSessionTimeout
  );

  return {
    sessionTimeout: sessionCore.sessionTimeout,
    resetSessionTimeout: sessionCore.resetSessionTimeout,
    restoreSession: sessionCore.restoreSession,
    clearSession: sessionCore.clearSession
  };
};
