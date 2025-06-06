
import { User, UserRole } from '@/types/auth';

export const useAuthorization = () => {
  const hasPermission = (currentUser: User | null, requiredRole: UserRole): boolean => {
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

  return {
    hasPermission
  };
};
