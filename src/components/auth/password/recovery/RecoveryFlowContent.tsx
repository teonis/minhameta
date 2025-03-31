
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
  expirationTime: Date | null;
  isLoading: boolean;
  canResend: boolean;
  displayedCode: string | null;
  onRequestCode: (values: any) => Promise<void>;
  onVerifyCode: (values: any) => Promise<void>;
  onResetPassword: (values: any) => Promise<void>;
  onResendCode: () => Promise<void>;
  onBackToRequestCode: () => void;
  onBackToVerifyCode: () => void;
  onRedirectToLogin: () => void;
}

const RecoveryFlowContent: React.FC<RecoveryFlowContentProps> = ({
  currentStep,
  error,
  userEmail,
  expirationTime,
  isLoading,
  canResend,
  displayedCode,
  onRequestCode,
  onVerifyCode,
  onResetPassword,
  onResendCode,
  onBackToRequestCode,
  onBackToVerifyCode,
  onRedirectToLogin
}) => {
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
          {displayedCode && currentStep === PasswordRecoveryStep.REQUEST_CODE && (
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-center">
              <p className="text-sm font-medium">Um código de recuperação já foi gerado:</p>
              <p className="text-lg font-mono tracking-widest mt-1">{displayedCode}</p>
              <p className="text-xs text-gray-500 mt-1">Anote este código e clique em Enviar para prosseguir</p>
            </div>
          )}
          
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
              expirationTime={expirationTime}
              onSubmit={onVerifyCode} 
              onBack={onBackToRequestCode}
              onResend={onResendCode}
              error={error} 
              isLoading={isLoading}
              canResend={canResend}
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
