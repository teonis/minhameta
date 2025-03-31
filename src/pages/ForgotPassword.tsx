
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
    expirationTime,
    isLoading,
    canResend,
    displayedCode,
    handleAlternativeCodeRedirect,
    handleRequestCode,
    handleVerifyCode,
    handleResetPassword,
    handleResendCode,
    redirectToLogin
  } = usePasswordRecoveryFlow();
  
  // Check for alternative code state on component mount
  useEffect(() => {
    handleAlternativeCodeRedirect();
  }, []);
  
  // Helper functions to navigate back between steps
  const goBackToRequestCode = () => setCurrentStep(PasswordRecoveryStep.REQUEST_CODE);
  const goBackToVerifyCode = () => setCurrentStep(PasswordRecoveryStep.VERIFY_CODE);

  return (
    <AuthLayout>
      <RecoveryFlowContent
        currentStep={currentStep}
        error={error}
        userEmail={userEmail}
        expirationTime={expirationTime}
        isLoading={isLoading}
        canResend={canResend}
        displayedCode={displayedCode}
        onRequestCode={handleRequestCode}
        onVerifyCode={handleVerifyCode}
        onResetPassword={handleResetPassword}
        onResendCode={handleResendCode}
        onBackToRequestCode={goBackToRequestCode}
        onBackToVerifyCode={goBackToVerifyCode}
        onRedirectToLogin={redirectToLogin}
      />
    </AuthLayout>
  );
};

export default ForgotPassword;
