
import { MockUser, UserRole } from "../types/auth";

// Mock user database for demonstration
export const MOCK_USERS: MockUser[] = [
  {
    id: '1',
    email: 'teonisr@gmail.com',
    name: 'Super Admin',
    role: UserRole.SUPER_ADMIN,
    cpf: '09937063477',
    password: 'SuperAdmin@123',
    isEmailVerified: true,
    lastActive: new Date(),
    createdAt: new Date(),
    mfaEnabled: true
  },
  {
    id: '2',
    email: 'admin@clinicarocha.com',
    name: 'Admin',
    role: UserRole.ADMIN,
    password: 'Admin@123456',
    isEmailVerified: true,
    lastActive: new Date(),
    createdAt: new Date(),
    mfaEnabled: true
  },
  {
    id: '3',
    email: 'profissional@clinicarocha.com',
    name: 'Profissional',
    role: UserRole.PROFESSIONAL,
    password: 'Prof@123456',
    isEmailVerified: true,
    lastActive: new Date(),
    createdAt: new Date(),
    mfaEnabled: false
  },
  {
    id: '4',
    email: 'paciente@email.com',
    name: 'Paciente',
    role: UserRole.PATIENT,
    password: 'Paciente@123',
    isEmailVerified: true,
    lastActive: new Date(),
    createdAt: new Date(),
    mfaEnabled: false
  }
];

// Failed login attempts tracking
export const loginAttempts: Record<string, { count: number, lockedUntil?: Date }> = {};

// Password reset requests tracking
export const passwordResetRequests: Record<string, { count: number, lastRequestTime: Date }> = {};
