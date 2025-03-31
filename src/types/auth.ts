
// Define user roles
export enum UserRole {
  PATIENT = 'patient',
  PROFESSIONAL = 'professional',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin',
}

// Define user interface
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  cpf?: string;
  isEmailVerified: boolean;
  lastActive: Date;
  createdAt: Date;
  profileImage?: string;
}

export interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  logoutAllSessions: () => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  verifyMFA: (code: string) => Promise<boolean>;
  resetPassword: (email: string) => Promise<string>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  verifyRecoveryCode: (email: string, code: string) => Promise<boolean>;
  resetPasswordWithCode: (email: string, code: string, newPassword: string) => Promise<boolean>;
  hasPermission: (requiredRole: UserRole) => boolean;
}

// Mock user structure with password and MFA fields
export interface MockUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  cpf?: string;
  password: string;
  isEmailVerified: boolean;
  lastActive: Date;
  createdAt: Date;
  mfaEnabled: boolean;
  profileImage?: string;
}

export interface LoginAttempt {
  count: number;
  lockedUntil?: Date;
}

export interface PasswordResetRequest {
  count: number;
  lastRequestTime: Date;
}
