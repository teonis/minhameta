
import { useState } from 'react';
import { recoveryCodesStore } from './recoveryStore';

export const useCodeVerification = (setIsLoadingExternal: (loading: boolean) => void) => {
  const [isLoading, setIsLoading] = useState(false);

  const setLoadingState = (state: boolean) => {
    setIsLoading(state);
    setIsLoadingExternal(state);
  };

  // Verificar código informado pelo usuário
  const verifyRecoveryCode = async (email: string, code: string): Promise<boolean> => {
    setLoadingState(true);

    try {
      const recoveryData = recoveryCodesStore[email];
      
      // Verificar se existe código para este email
      if (!recoveryData) {
        throw new Error("Código de recuperação não encontrado. Solicite um novo.");
      }

      // Verificar se o código já foi usado
      if (recoveryData.used) {
        throw new Error("Este código já foi utilizado. Solicite um novo.");
      }
      
      // Verificar se o código expirou
      const now = new Date();
      if (now > recoveryData.expiresAt) {
        throw new Error("Código expirado. Solicite um novo código.");
      }
      
      // Verificar tentativas excedidas
      if (recoveryData.attempts >= 5) {
        throw new Error("Número máximo de tentativas excedido. Solicite um novo código.");
      }
      
      // Incrementar contador de tentativas
      recoveryData.attempts += 1;
      
      // Verificar se o código está correto
      if (recoveryData.code !== code) {
        const remainingAttempts = 5 - recoveryData.attempts;
        throw new Error(`Código incorreto. Tentativas restantes: ${remainingAttempts}.`);
      }
      
      // Simulação da latência de API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setLoadingState(false);
      return true;
    } catch (error: any) {
      setLoadingState(false);
      throw error;
    }
  };

  // Redefinir senha após verificação do código
  const resetPasswordWithCode = async (email: string, code: string, newPassword: string): Promise<boolean> => {
    setLoadingState(true);

    try {
      // Primeiro verificar o código
      const isVerified = await verifyRecoveryCode(email, code);
      
      if (!isVerified) {
        throw new Error("Código inválido. Verifique e tente novamente.");
      }
      
      // Validar nova senha
      if (newPassword.length < 6) {
        throw new Error("A nova senha deve ter no mínimo 6 caracteres.");
      }
      
      // Marcar código como usado após verificação bem-sucedida
      if (recoveryCodesStore[email]) {
        recoveryCodesStore[email].used = true;
      }
      
      // Em um ambiente real, aqui atualizaríamos a senha no banco de dados
      console.log(`Senha redefinida com sucesso para o email: ${email}`);
      
      // Simulação da latência de API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setLoadingState(false);
      return true;
    } catch (error: any) {
      setLoadingState(false);
      throw error;
    }
  };

  // Marcar código como usado (quando o processo for concluído ou abandonado)
  const invalidateCode = (email: string) => {
    if (recoveryCodesStore[email]) {
      recoveryCodesStore[email].used = true;
    }
  };

  return {
    verifyRecoveryCode,
    resetPasswordWithCode,
    invalidateCode
  };
};
