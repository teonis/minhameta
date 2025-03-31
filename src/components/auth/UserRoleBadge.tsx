
import React from 'react';
import { Shield, User } from 'lucide-react';
import { UserRole } from '@/types/auth';

interface UserRoleBadgeProps {
  role: UserRole;
  size?: number;
  showLabel?: boolean;
}

const UserRoleBadge: React.FC<UserRoleBadgeProps> = ({ 
  role, 
  size = 16, 
  showLabel = false 
}) => {
  // Function to get role icon
  const getRoleIcon = () => {
    switch (role) {
      case UserRole.SUPER_ADMIN:
        return <Shield size={size} className="text-red-600" />;
      case UserRole.ADMIN:
        return <Shield size={size} className="text-purple-600" />;
      case UserRole.PROFESSIONAL:
        return <Shield size={size} className="text-blue-600" />;
      default:
        return <User size={size} className="text-gray-600" />;
    }
  };

  // Function to get role display name
  const getRoleDisplayName = () => {
    switch (role) {
      case UserRole.SUPER_ADMIN:
        return "Super Admin";
      case UserRole.ADMIN:
        return "Admin";
      case UserRole.PROFESSIONAL:
        return "Profissional";
      case UserRole.PATIENT:
        return "Paciente";
      default:
        return "Usuário";
    }
  };

  return (
    <div className="flex items-center gap-1">
      {getRoleIcon()}
      {showLabel && (
        <span className="text-sm text-gray-700">{getRoleDisplayName()}</span>
      )}
    </div>
  );
};

export default UserRoleBadge;
