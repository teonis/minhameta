
import { useEffect, useCallback } from 'react';

export const useActivityTracking = (
  checkForSession: () => boolean,
  extendSession: () => void
) => {
  const handleUserActivity = useCallback(() => {
    if (checkForSession()) {
      extendSession();
    }
  }, [checkForSession, extendSession]);

  // Set up activity listeners for session extension
  useEffect(() => {
    const activityEvents = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    
    activityEvents.forEach(event => {
      window.addEventListener(event, handleUserActivity);
    });
    
    return () => {
      activityEvents.forEach(event => {
        window.removeEventListener(event, handleUserActivity);
      });
    };
  }, [handleUserActivity]);

  return {
    handleUserActivity
  };
};
