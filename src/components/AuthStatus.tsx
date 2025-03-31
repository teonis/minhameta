
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import UserRoleBadge from './auth/UserRoleBadge';

const AuthStatus: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  if (!currentUser) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1 text-sm">
        <UserRoleBadge 
          role={currentUser.role} 
          showLabel={!window.matchMedia('(max-width: 640px)').matches} 
        />
        <span className="hidden sm:inline text-gray-700">
          {currentUser.name || <UserRoleBadge role={currentUser.role} showLabel />}
        </span>
      </div>
      
      <Link 
        to="/configuracoes"
        className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800"
      >
        <Settings size={16} />
        <span className="hidden sm:inline">Configurações</span>
      </Link>
      
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
