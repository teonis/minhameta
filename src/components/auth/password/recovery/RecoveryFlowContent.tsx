
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import ProgressSteps, { PasswordRecoveryStep } from "./ProgressSteps";
import RequestCodeStep from "./RequestCodeStep";
import VerifyCodeStep from "./VerifyCodeStep";
import ResetPasswordStep from "./ResetPasswordStep";
import SuccessStep from "./SuccessStep";

interface RecoveryFlowContentProps {
  currentStep: PasswordRecoveryStep;
  error: string;
  userEmail: string;
  isLoading: boolean;
  onRequestCode: (values: any) => Promise<void>;
  onVerifyCode: (values: any) => Promise<void>;
  onResetPassword: (values: any) => Promise<void>;
  onBackToRequestCode: () => void;
  onBackToVerifyCode: () => void;
  onRedirectToLogin: () => void;
}

const RecoveryFlowContent: React.FC<RecoveryFlowContentProps> = ({
  currentStep,
  error,
  userEmail,
  isLoading,
  onRequestCode,
  onVerifyCode,
  onResetPassword,
  onBackToRequestCode,
  onBackToVerifyCode,
  onRedirectToLogin
}) => {
  const handleResend = async () => {
    // Simple resend implementation - just call onRequestCode with current email
    if (userEmail) {
      await onRequestCode({ email: userEmail });
    }
  };

  return (
    <>
      <div className="text-center mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">Recuperar Senha</h1>
        
        <ProgressSteps currentStep={currentStep} />
        
        <p className="text-sm text-gray-600 mt-2">
          {currentStep === PasswordRecoveryStep.REQUEST_CODE && "Informe seu email para receber um código de recuperação"}
          {currentStep === PasswordRecoveryStep.VERIFY_CODE && "Digite o código de 6 dígitos enviado para seu email"}
          {currentStep === PasswordRecoveryStep.RESET_PASSWORD && "Crie uma nova senha para sua conta"}
          {currentStep === PasswordRecoveryStep.SUCCESS && "Senha alterada com sucesso!"}
        </p>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          {currentStep === PasswordRecoveryStep.REQUEST_CODE && (
            <RequestCodeStep 
              onSubmit={onRequestCode} 
              error={error} 
              isLoading={isLoading} 
            />
          )}
          
          {currentStep === PasswordRecoveryStep.VERIFY_CODE && (
            <VerifyCodeStep 
              userEmail={userEmail}
              expirationTime={null}
              onSubmit={onVerifyCode} 
              onBack={onBackToRequestCode}
              onResend={handleResend}
              error={error} 
              isLoading={isLoading}
              canResend={true}
            />
          )}
          
          {currentStep === PasswordRecoveryStep.RESET_PASSWORD && (
            <ResetPasswordStep 
              onSubmit={onResetPassword} 
              onBack={onBackToVerifyCode}
              error={error} 
              isLoading={isLoading} 
            />
          )}
          
          {currentStep === PasswordRecoveryStep.SUCCESS && (
            <SuccessStep redirectToLogin={onRedirectToLogin} />
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default RecoveryFlowContent;
