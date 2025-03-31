import { useState } from 'react';
import { toast } from "sonner";

// Simulação de banco de dados para armazenar códigos de recuperação
interface RecoveryCodeData {
  code: string;
  expiresAt: Date;
  attempts: number;
  used: boolean;
}

// Em um ambiente real, isso estaria no banco de dados
const recoveryCodesStore: Record<string, RecoveryCodeData> = {};

// Códigos de recuperação fixos para recuperação alternativa
// Em um ambiente real, isso seria gerenciado de forma segura no backend
const fallbackRecoveryCodes: Record<string, string> = {
  'admin@clinicarocha.com': '123456',
  'teonisr@gmail.com': '654321',
  'profissional@clinicarocha.com': '987654',
  'paciente@email.com': '456789'
};

export const useRecoveryCode = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [codeExpiration, setCodeExpiration] = useState<Date | null>(null);
  const [canResend, setCanResend] = useState(true);
  const [displayedCode, setDisplayedCode] = useState<string | null>(null);

  // Gerar código de recuperação de 6 dígitos
  const generateRecoveryCode = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

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

  // Verificar código informado pelo usuário
  const verifyRecoveryCode = async (email: string, code: string): Promise<boolean> => {
    setIsLoading(true);

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
      
      // Marcar código como usado após verificação bem-sucedida
      recoveryData.used = true;
      
      // Simulação da latência de API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setIsLoading(false);
      return true;
    } catch (error: any) {
      setIsLoading(false);
      throw error;
    }
  };

  // Redefinir senha após verificação do código
  const resetPasswordWithCode = async (email: string, code: string, newPassword: string): Promise<boolean> => {
    setIsLoading(true);

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
      
      // Em um ambiente real, aqui atualizaríamos a senha no banco de dados
      console.log(`Senha redefinida com sucesso para o email: ${email}`);
      
      // Simulação da latência de API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setIsLoading(false);
      return true;
    } catch (error: any) {
      setIsLoading(false);
      throw error;
    }
  };

  // Marcar código como usado (quando o processo for concluído ou abandonado)
  const invalidateCode = (email: string) => {
    if (recoveryCodesStore[email]) {
      recoveryCodesStore[email].used = true;
    }
  };

  // Limpar código exibido
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
    verifyRecoveryCode,
    resetPasswordWithCode,
    invalidateCode,
    clearDisplayedCode
  };
};
