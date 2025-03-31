
import { useState } from 'react';
import { useCodeGeneration } from './recovery/useCodeGeneration';
import { useCodeVerification } from './recovery/useCodeVerification';
import { UseRecoveryCodeReturn } from './recovery/types';

export const useRecoveryCode = (): UseRecoveryCodeReturn => {
  const [isLoading, setIsLoading] = useState(false);
  
  const { 
    codeExpiration, 
    canResend, 
    displayedCode, 
    sendRecoveryCode: generateCode, 
    useFallbackRecoveryCode: generateFallbackCode, 
    clearDisplayedCode,
    setIsLoading: setGenerationLoading
  } = useCodeGeneration();
  
  const { 
    verifyRecoveryCode, 
    resetPasswordWithCode, 
    invalidateCode 
  } = useCodeVerification(setGenerationLoading);

  // Wrapper para gerenciar o estado de carregamento centralizado
  const sendRecoveryCode = async (email: string): Promise<string> => {
    setIsLoading(true);
    try {
      const result = await generateCode(email);
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  const useFallbackRecoveryCode = async (email: string): Promise<string | null> => {
    setIsLoading(true);
    try {
      const result = await generateFallbackCode(email);
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    codeExpiration,
    canResend,
    displayedCode,
    sendRecoveryCode,
    useFallbackRecoveryCode,
    verifyRecoveryCode,
    resetPasswordWithCode,
    invalidateCode,
    clearDisplayedCode
  };
};
