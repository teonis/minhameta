
import { loginAttempts } from '@/data/mockUsers';

export const useLoginAttempts = () => {
  const checkLoginAttempts = (email: string) => {
    // Check if account is locked due to too many failed attempts
    if (loginAttempts[email]?.lockedUntil && new Date() < loginAttempts[email].lockedUntil!) {
      const remainingMinutes = Math.ceil(
        (loginAttempts[email].lockedUntil!.getTime() - new Date().getTime()) / (60 * 1000)
      );
      throw new Error(`Conta temporariamente bloqueada. Tente novamente em ${remainingMinutes} minutos.`);
    }
  };

  const trackFailedAttempt = (email: string) => {
    // Track failed login attempts
    loginAttempts[email] = loginAttempts[email] || { count: 0 };
    loginAttempts[email].count += 1;
    
    // Lock account after 5 failed attempts
    if (loginAttempts[email].count >= 5) {
      // Lock for 30 minutes
      loginAttempts[email].lockedUntil = new Date(new Date().getTime() + 30 * 60 * 1000);
      throw new Error("Conta bloqueada por tentativas excessivas de login. Tente novamente em 30 minutos.");
    }
  };

  const resetLoginAttempts = (email: string) => {
    delete loginAttempts[email];
  };

  return {
    checkLoginAttempts,
    trackFailedAttempt,
    resetLoginAttempts
  };
};
