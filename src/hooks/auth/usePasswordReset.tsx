
import { useState } from 'react';
import { passwordResetRequests } from '@/data/mockUsers';
import { toast } from "sonner";
import { User } from '@/types/auth';

export const usePasswordReset = () => {
  const [isLoading, setIsLoading] = useState(false);

  const resetPassword = async (email: string) => {
    setIsLoading(true);
    
    try {
      // Check if email is in valid format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error("Formato de email inválido.");
      }
      
      // Rate limiting check
      const now = new Date();
      if (passwordResetRequests[email]) {
        const hoursSinceLastRequest = (now.getTime() - passwordResetRequests[email].lastRequestTime.getTime()) / (1000 * 60 * 60);
        
        // If less than 24 hours since last request and already made 3 requests
        if (hoursSinceLastRequest < 24 && passwordResetRequests[email].count >= 3) {
          const hoursRemaining = Math.ceil(24 - hoursSinceLastRequest);
          throw new Error(`Limite de solicitações excedido. Tente novamente em ${hoursRemaining} horas.`);
        }
        
        // If it's been more than 24 hours, reset the count
        if (hoursSinceLastRequest >= 24) {
          passwordResetRequests[email] = { count: 1, lastRequestTime: now };
        } else {
          // Otherwise increment the count
          passwordResetRequests[email].count += 1;
          passwordResetRequests[email].lastRequestTime = now;
        }
      } else {
        // First request for this email
        passwordResetRequests[email] = { count: 1, lastRequestTime: now };
      }
      
      // Log the reset request (for demo purposes)
      console.log(`Password reset requested for: ${email}`);
      console.log(`Generated reset token would be emailed with link: /reset-password?token=${generateMockToken()}`);
      
      // Simulate delay for API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsLoading(false);
      
      return Promise.resolve();
    } catch (error: any) {
      setIsLoading(false);
      throw error;
    }
  };

  const updatePassword = async (currentPasswordOrToken: string, newPassword: string, currentUser?: User | null) => {
    setIsLoading(true);
    
    try {
      // Validate new password strength
      if (newPassword.length < 6) {
        throw new Error("A nova senha deve ter no mínimo 6 caracteres.");
      }
      
      // Check if this is a token-based reset or a user-initiated password change
      const isTokenReset = currentPasswordOrToken.length >= 20; // Assuming tokens are long
      
      if (isTokenReset) {
        // This is a reset token flow - in a real app, we would validate the token
        // and find the associated user
        console.log(`Password reset with token: ${currentPasswordOrToken.substring(0, 10)}...`);
        
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
        
        toast.success("Senha redefinida com sucesso!");
      } else {
        if (!currentUser) {
          throw new Error("Usuário não autenticado.");
        }
        
        // For demo, just log the action
        console.log(`User ${currentUser.email} changing password`);
        
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
        
        toast.success("Senha atualizada com sucesso!");
      }
      
      setIsLoading(false);
      return Promise.resolve();
    } catch (error: any) {
      setIsLoading(false);
      throw error;
    }
  };

  // Generate a mock reset token (in a real app, this would be a cryptographically secure token)
  const generateMockToken = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 40; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
  };

  return {
    isLoading,
    resetPassword,
    updatePassword
  };
};
