
// Types for the recovery code functionality
export interface RecoveryCodeData {
  code: string;
  expiresAt: Date;
  attempts: number;
  used: boolean;
}

export interface UseRecoveryCodeReturn {
  isLoading: boolean;
  codeExpiration: Date | null;
  canResend: boolean;
  displayedCode: string | null;
  sendRecoveryCode: (email: string) => Promise<string>;
  useFallbackRecoveryCode: (email: string) => Promise<string | null>;
  verifyRecoveryCode: (email: string, code: string) => Promise<boolean>;
  resetPasswordWithCode: (email: string, code: string, newPassword: string) => Promise<boolean>;
  invalidateCode: (email: string) => void;
  clearDisplayedCode: () => void;
}
