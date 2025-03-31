
import { useState, useCallback } from 'react';
import { User } from '@/types/auth';

export const useSessionCore = (onLogout: () => void) => {
  const [sessionTimeout, setSessionTimeout] = useState<NodeJS.Timeout | null>(null);

  const resetSessionTimeout = useCallback(() => {
    if (sessionTimeout) {
      clearTimeout(sessionTimeout);
    }
    
    // Set session expiration (30 minutes)
    const expirationTime = new Date(new Date().getTime() + 30 * 60 * 1000);
    localStorage.setItem('sessionExpiresAt', expirationTime.toISOString());
    
    const timeout = setTimeout(() => {
      onLogout();
    }, 30 * 60 * 1000);
    
    setSessionTimeout(timeout);
  }, [sessionTimeout, onLogout]);

  // Restore session from localStorage
  const restoreSession = useCallback((): User | null => {
    const savedUser = localStorage.getItem('currentUser');
    const expiresAt = localStorage.getItem('sessionExpiresAt');
    
    if (savedUser && expiresAt && new Date(expiresAt) > new Date()) {
      resetSessionTimeout();
      return JSON.parse(savedUser);
    } else {
      // Clear expired session
      clearSession();
      return null;
    }
  }, [resetSessionTimeout]);

  const clearSession = useCallback(() => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('sessionExpiresAt');
    localStorage.removeItem('isLoggedIn');
    
    if (sessionTimeout) {
      clearTimeout(sessionTimeout);
      setSessionTimeout(null);
    }
  }, [sessionTimeout]);

  return {
    sessionTimeout,
    resetSessionTimeout,
    restoreSession,
    clearSession
  };
};
