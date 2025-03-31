
import React from 'react';
import PasswordSection from './security/PasswordSection';
import TwoFactorSection from './security/TwoFactorSection';
import SessionManagementSection from './security/SessionManagementSection';
import { toast } from 'sonner';

const SecuritySettings = () => {
  return (
    <div className="space-y-6">
      <PasswordSection />
      <TwoFactorSection />
      <SessionManagementSection />
    </div>
  );
};

export default SecuritySettings;
