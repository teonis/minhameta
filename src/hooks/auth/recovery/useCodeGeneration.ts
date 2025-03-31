
import { useState } from 'react';
import { generateRecoveryCode, recoveryCodesStore, fallbackRecoveryCodes } from './recoveryStore';

export const useCodeGeneration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [codeExpiration, setCodeExpiration] = useState<Date | null>(null);
  const [canResend, setCanResend] = useState(true);
  const [displayedCode, setDisplayedCode] = useState<string | null>(null);

  // Enviar código de recuperação por email
  const sendRecoveryCode = async (email: string): Promise<string> => {
    setIsLoading(true);
    setCanResend(false);

    try {
      // Verificar formato do email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error("Formato de email inválido.");
      }

      // Gerar novo código
      const code = generateRecoveryCode();
      
      // Definir expiração (15 minutos)
      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + 15);
      
      // Armazenar código
      recoveryCodesStore[email] = {
        code,
        expiresAt,
        attempts: 0,
        used: false
      };

      setCodeExpiration(expiresAt);
      
      // Mostrar código na interface (simulando envio por email)
      setDisplayedCode(code);
      
      // Em um ambiente real, aqui enviaríamos o email com o código
      console.log(`Código de recuperação para ${email}: ${code}`);
      console.log(`Expira em: ${expiresAt.toLocaleTimeString()}`);
      
      // Configurar timer para permitir reenvio após 2 minutos
      setTimeout(() => {
        setCanResend(true);
      }, 2 * 60 * 1000);

      // Simulação da latência de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsLoading(false);
      return code;
    } catch (error: any) {
      setIsLoading(false);
      throw error;
    }
  };

  // Usar código de recuperação alternativo baseado no email
  const useFallbackRecoveryCode = async (email: string): Promise<string | null> => {
    setIsLoading(true);
    
    try {
      // Verificar formato do email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error("Formato de email inválido.");
      }

      // Verificar se existe código fixo para este email
      if (!fallbackRecoveryCodes[email]) {
        throw new Error("Email não encontrado no sistema.");
      }
      
      const code = fallbackRecoveryCodes[email];
      
      // Definir expiração (15 minutos)
      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + 15);
      
      // Armazenar código
      recoveryCodesStore[email] = {
        code,
        expiresAt,
        attempts: 0,
        used: false
      };

      setCodeExpiration(expiresAt);
      setDisplayedCode(code);
      
      // Simulação da latência de API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setIsLoading(false);
      return code;
    } catch (error: any) {
      setIsLoading(false);
      throw error;
    }
  };

  const clearDisplayedCode = () => {
    setDisplayedCode(null);
  };

  return {
    isLoading,
    codeExpiration,
    canResend,
    displayedCode,
    sendRecoveryCode,
    useFallbackRecoveryCode,
    clearDisplayedCode,
    setIsLoading
  };
};
