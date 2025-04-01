
import { useState } from 'react';
import { recoveryCodesStore, generateRecoveryCode } from './recovery/recoveryStore';

export const useRecoveryCode = () => {
  const [isLoading, setIsLoading] = useState(false);

  const sendRecoveryCode = async (email: string): Promise<string> => {
    setIsLoading(true);
    try {
      // Generate new code
      const code = generateRecoveryCode();
      
      // Set expiration (15 minutes)
      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + 15);
      
      // Store code
      recoveryCodesStore[email] = {
        code,
        expiresAt,
        attempts: 0,
        used: false
      };
      
      // In a real implementation, we would send an email with the code
      console.log(`Código de recuperação para ${email}: ${code}`);
      console.log(`Expira em: ${expiresAt.toLocaleTimeString()}`);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsLoading(false);
      return code;
    } catch (error: any) {
      setIsLoading(false);
      throw error;
    }
  };

  const verifyRecoveryCode = async (email: string, code: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const recoveryData = recoveryCodesStore[email];
      
      if (!recoveryData) {
        throw new Error("Código de recuperação não encontrado. Solicite um novo.");
      }
      
      // Check code expiration
      const now = new Date();
      if (now > recoveryData.expiresAt) {
        throw new Error("Código expirado. Solicite um novo código.");
      }
      
      // Check if code is correct
      if (recoveryData.code !== code) {
        throw new Error("Código incorreto. Tente novamente.");
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setIsLoading(false);
      return true;
    } catch (error: any) {
      setIsLoading(false);
      throw error;
    }
  };

  const resetPasswordWithCode = async (email: string, code: string, newPassword: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // First verify the code
      const isVerified = await verifyRecoveryCode(email, code);
      
      if (!isVerified) {
        throw new Error("Código inválido. Verifique e tente novamente.");
      }
      
      // Mark code as used after successful verification
      if (recoveryCodesStore[email]) {
        recoveryCodesStore[email].used = true;
      }
      
      // In a real implementation, we would update the password in the database
      console.log(`Senha redefinida com sucesso para o email: ${email}`);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setIsLoading(false);
      return true;
    } catch (error: any) {
      setIsLoading(false);
      throw error;
    }
  };

  return {
    isLoading,
    sendRecoveryCode,
    verifyRecoveryCode,
    resetPasswordWithCode
  };
};
