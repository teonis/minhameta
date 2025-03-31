
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Shield } from 'lucide-react';
import { toast } from "sonner";
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';

const AuthStatus: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  if (!currentUser) {
    return null;
  }

  // Function to get role badge
  const getRoleBadge = () => {
    switch (currentUser.role) {
      case UserRole.SUPER_ADMIN:
        return <Shield size={16} className="text-red-600" />;
      case UserRole.ADMIN:
        return <Shield size={16} className="text-purple-600" />;
      case UserRole.PROFESSIONAL:
        return <Shield size={16} className="text-blue-600" />;
      default:
        return <User size={16} className="text-gray-600" />;
    }
  };

  // Function to get role display name
  const getRoleDisplayName = () => {
    switch (currentUser.role) {
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

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1 text-sm">
        {getRoleBadge()}
        <span className="hidden sm:inline text-gray-700">{currentUser.name || getRoleDisplayName()}</span>
      </div>
      <button 
        onClick={handleLogout}
        className="flex items-center gap-1 text-sm text-red-600 hover:text-red-800"
      >
        <LogOut size={16} />
        <span className="hidden sm:inline">Sair</span>
      </button>
    </div>
  );
};

export default AuthStatus;
