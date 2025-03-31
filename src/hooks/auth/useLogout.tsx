
import { useState } from 'react';
import { toast } from "sonner";

export const useLogout = (
  setCurrentUser: (user: null) => void,
  clearSession: () => void
) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    setCurrentUser(null);
    clearSession();
    toast.success("Logout realizado com sucesso!");
  };

  const logoutAllSessions = async () => {
    try {
      setIsLoading(true);
      
      // In a real app, this would invalidate all tokens in the database
      
      // Clear local session
      localStorage.removeItem('currentUser');
      localStorage.removeItem('sessionExpiresAt');
      localStorage.removeItem('isLoggedIn');
      
      clearSession();
      
      setCurrentUser(null);
      setIsLoading(false);
      
      toast.success("Todas as sessões foram encerradas com sucesso!");
      
      return Promise.resolve();
    } catch (error) {
      setIsLoading(false);
      toast.error("Erro ao encerrar sessões. Tente novamente.");
      return Promise.reject(error);
    }
  };

  return {
    isLoading,
    handleLogout,
    logoutAllSessions
  };
};
