
import { useState, useEffect, useCallback } from 'react';
import { User } from '@/types/auth';
import { toast } from 'sonner';

export const useSession = (onLogout: () => void) => {
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
      toast.info("Sua sessão expirou por inatividade. Por favor, faça login novamente.");
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
      localStorage.removeItem('currentUser');
      localStorage.removeItem('sessionExpiresAt');
      localStorage.removeItem('isLoggedIn');
      return null;
    }
  }, [resetSessionTimeout]);

  // Set up activity listeners for session extension
  useEffect(() => {
    const activityEvents = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    
    const handleUserActivity = () => {
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
        resetSessionTimeout();
      }
    };
    
    activityEvents.forEach(event => {
      window.addEventListener(event, handleUserActivity);
    });
    
    return () => {
      activityEvents.forEach(event => {
        window.removeEventListener(event, handleUserActivity);
      });
      
      if (sessionTimeout) {
        clearTimeout(sessionTimeout);
      }
    };
  }, [sessionTimeout, resetSessionTimeout]);

  return {
    sessionTimeout,
    resetSessionTimeout,
    restoreSession,
    clearSession: () => {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('sessionExpiresAt');
      localStorage.removeItem('isLoggedIn');
      
      if (sessionTimeout) {
        clearTimeout(sessionTimeout);
      }
    }
  };
};
