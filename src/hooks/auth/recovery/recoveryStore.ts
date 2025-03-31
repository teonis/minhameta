
import { RecoveryCodeData } from './types';

// Simulação de banco de dados para armazenar códigos de recuperação
export const recoveryCodesStore: Record<string, RecoveryCodeData> = {};

// Códigos de recuperação fixos para recuperação alternativa
// Em um ambiente real, isso seria gerenciado de forma segura no backend
export const fallbackRecoveryCodes: Record<string, string> = {
  'admin@clinicarocha.com': '123456',
  'teonisr@gmail.com': '654321',
  'profissional@clinicarocha.com': '987654',
  'paciente@email.com': '456789'
};

// Gerar código de recuperação de 6 dígitos
export const generateRecoveryCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
