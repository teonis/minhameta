
import { useEffect } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import { usePasswordRecoveryFlow } from "@/hooks/auth/recovery/usePasswordRecoveryFlow";
import RecoveryFlowContent from "@/components/auth/password/recovery/RecoveryFlowContent";
import { PasswordRecoveryStep } from "@/components/auth/password/recovery/ProgressSteps";

const ForgotPassword = () => {
  const {
    currentStep,
    setCurrentStep,
    error,
    userEmail,
    isLoading,
    handleRequestCode,
    handleVerifyCode,
    handleResetPassword,
    redirectToLogin
  } = usePasswordRecoveryFlow();
  
  // Helper functions to navigate back between steps
  const goBackToRequestCode = () => setCurrentStep(PasswordRecoveryStep.REQUEST_CODE);
  const goBackToVerifyCode = () => setCurrentStep(PasswordRecoveryStep.VERIFY_CODE);

  return (
    <AuthLayout>
      <RecoveryFlowContent
        currentStep={currentStep}
        error={error}
        userEmail={userEmail}
        isLoading={isLoading}
        onRequestCode={handleRequestCode}
        onVerifyCode={handleVerifyCode}
        onResetPassword={handleResetPassword}
        onBackToRequestCode={goBackToRequestCode}
        onBackToVerifyCode={goBackToVerifyCode}
        onRedirectToLogin={redirectToLogin}
      />
    </AuthLayout>
  );
};

export default ForgotPassword;
