
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthLayout from "@/components/auth/AuthLayout";
import { toast } from "sonner";
import { useRecoveryCode } from "@/hooks/auth/useRecoveryCode";

// Import our component files
import ProgressSteps, { PasswordRecoveryStep } from "@/components/auth/password/recovery/ProgressSteps";
import RequestCodeStep, { RequestCodeValues } from "@/components/auth/password/recovery/RequestCodeStep";
import VerifyCodeStep, { VerifyCodeValues } from "@/components/auth/password/recovery/VerifyCodeStep";
import ResetPasswordStep, { ResetPasswordValues } from "@/components/auth/password/recovery/ResetPasswordStep";
import SuccessStep from "@/components/auth/password/recovery/SuccessStep";
import { Card, CardContent } from "@/components/ui/card";

const ForgotPassword = () => {
  const [currentStep, setCurrentStep] = useState<PasswordRecoveryStep>(PasswordRecoveryStep.REQUEST_CODE);
  const [error, setError] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [recoveryCode, setRecoveryCode] = useState("");
  const [expirationTime, setExpirationTime] = useState<Date | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  const { 
    sendRecoveryCode, 
    verifyRecoveryCode, 
    resetPasswordWithCode, 
    isLoading, 
    canResend,
    displayedCode,
    clearDisplayedCode
  } = useRecoveryCode();

  // Handle coming from the alternative code page
  useEffect(() => {
    if (location.state?.alternativeCodeGenerated) {
      // If we have a recovery email from the state, use it
      if (location.state.recoveryEmail) {
        setUserEmail(location.state.recoveryEmail);
      }
      
      // If we have a displayed code, show it to the user
      if (displayedCode) {
        // Set expiration time (15 minutes from now)
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 15);
        setExpirationTime(expiresAt);
        
        // Show the code in a toast that stays longer
        toast.info(
          <div className="space-y-2">
            <p className="font-medium">Seu código de recuperação:</p>
            <p className="font-mono text-lg tracking-widest bg-yellow-50 p-2 rounded">{displayedCode}</p>
            <p className="text-xs">Utilize este código no passo seguinte</p>
          </div>,
          {
            duration: 15000,
            id: "recovery-code-toast"
          }
        );
        
        // Automatically proceed to code verification step
        setCurrentStep(PasswordRecoveryStep.VERIFY_CODE);
      }
    }
  }, [location.state, displayedCode]);

  const handleRequestCode = async (values: RequestCodeValues) => {
    setError("");
    
    try {
      const email = values.email;
      setUserEmail(email);
      
      await sendRecoveryCode(email);
      
      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + 15);
      setExpirationTime(expiresAt);
      
      toast.success("Código de recuperação enviado com sucesso!");
      setCurrentStep(PasswordRecoveryStep.VERIFY_CODE);
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro ao enviar o código. Tente novamente mais tarde.");
    }
  };

  const handleVerifyCode = async (values: VerifyCodeValues) => {
    setError("");
    
    try {
      const code = values.code;
      setRecoveryCode(code);
      
      const isVerified = await verifyRecoveryCode(userEmail, code);
      
      if (isVerified) {
        toast.success("Código verificado com sucesso!");
        setCurrentStep(PasswordRecoveryStep.RESET_PASSWORD);
      }
    } catch (err: any) {
      setError(err.message || "Código inválido. Verifique e tente novamente.");
    }
  };

  const handleResetPassword = async (values: ResetPasswordValues) => {
    setError("");
    
    try {
      const success = await resetPasswordWithCode(userEmail, recoveryCode, values.password);
      
      if (success) {
        // Clear the displayed code since we've completed the flow
        clearDisplayedCode();
        
        toast.success("Senha redefinida com sucesso!");
        setCurrentStep(PasswordRecoveryStep.SUCCESS);
        
        setTimeout(() => {
          navigate("/login", { state: { passwordReset: true } });
        }, 3000);
      }
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro ao redefinir sua senha. Tente novamente.");
    }
  };

  const handleResendCode = async () => {
    setError("");
    
    try {
      await sendRecoveryCode(userEmail);
      
      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + 15);
      setExpirationTime(expiresAt);
      
      toast.success("Novo código enviado com sucesso!");
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro ao reenviar o código. Tente novamente mais tarde.");
    }
  };

  const redirectToLogin = () => {
    navigate("/login", { state: { passwordReset: true } });
  };

  return (
    <AuthLayout>
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
              onSubmit={handleRequestCode} 
              error={error} 
              isLoading={isLoading} 
            />
          )}
          
          {currentStep === PasswordRecoveryStep.VERIFY_CODE && (
            <VerifyCodeStep 
              userEmail={userEmail}
              expirationTime={expirationTime}
              onSubmit={handleVerifyCode} 
              onBack={() => setCurrentStep(PasswordRecoveryStep.REQUEST_CODE)}
              onResend={handleResendCode}
              error={error} 
              isLoading={isLoading}
              canResend={canResend}
            />
          )}
          
          {currentStep === PasswordRecoveryStep.RESET_PASSWORD && (
            <ResetPasswordStep 
              onSubmit={handleResetPassword} 
              onBack={() => setCurrentStep(PasswordRecoveryStep.VERIFY_CODE)}
              error={error} 
              isLoading={isLoading} 
            />
          )}
          
          {currentStep === PasswordRecoveryStep.SUCCESS && (
            <SuccessStep redirectToLogin={redirectToLogin} />
          )}
        </CardContent>
      </Card>
    </AuthLayout>
  );
};

export default ForgotPassword;
