
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import { toast } from "sonner";

const AuthStatus: React.FC = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    toast.success("Logout realizado com sucesso!");
    navigate('/');
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1 text-sm">
        <User size={16} className="text-gray-600" />
        <span className="hidden sm:inline text-gray-700">Usuário</span>
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
