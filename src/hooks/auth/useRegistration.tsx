
import { useState } from 'react';
import { toast } from "sonner";
import { User, UserRole, MockUser } from '@/types/auth';
import { MOCK_USERS } from '@/data/mockUsers';

export const useRegistration = (setCurrentUser: (user: User | null) => void, resetSessionTimeout: () => void) => {
  const [isLoading, setIsLoading] = useState(false);

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    
    try {
      // Check if email already exists
      if (MOCK_USERS.some(u => u.email === email)) {
        throw new Error("Email já cadastrado.");
      }
      
      // Validate password length
      if (password.length < 6) {
        throw new Error("Senha deve ter no mínimo 6 caracteres.");
      }
      
      // In a real application, this would add to a database and send verification email
      // For demo, create a new user object with the provided details
      const newUser = {
        id: String(MOCK_USERS.length + 1),
        email,
        password, // In a real app, this would be hashed
        name,
        role,
        isEmailVerified: false, // would be false in real app until verified
        lastActive: new Date(),
        createdAt: new Date(),
        mfaEnabled: false
      };
      
      // Add the new user to our mock database (for demo purposes)
      MOCK_USERS.push(newUser as MockUser);
      
      // Success message
      toast.success("Cadastro realizado com sucesso!");
      
      // For demo purposes, automatically login after registration
      const { password: _, mfaEnabled, ...safeUserData } = newUser;
      
      setCurrentUser(safeUserData);
      localStorage.setItem('currentUser', JSON.stringify(safeUserData));
      localStorage.setItem('isLoggedIn', 'true');
      
      // Set session expiration
      resetSessionTimeout();
      
      setIsLoading(false);
      
      return Promise.resolve();
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  return {
    isLoading,
    register
  };
};
