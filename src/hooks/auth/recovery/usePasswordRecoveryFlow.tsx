import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useRecoveryCode } from "@/hooks/auth/useRecoveryCode";
import { PasswordRecoveryStep } from "@/components/auth/password/recovery/ProgressSteps";
import { RequestCodeValues } from "@/components/auth/password/recovery/RequestCodeStep";
import { VerifyCodeValues } from "@/components/auth/password/recovery/VerifyCodeStep";
import { ResetPasswordValues } from "@/components/auth/password/recovery/ResetPasswordStep";

export const usePasswordRecoveryFlow = () => {
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

  const handleAlternativeCodeRedirect = () => {
    if (location.state?.alternativeCodeGenerated) {
      if (location.state.recoveryEmail) {
        setUserEmail(location.state.recoveryEmail);
      }
      
      if (displayedCode) {
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 15);
        setExpirationTime(expiresAt);
        
        toast.info(
          React.createElement("div", { className: "space-y-2" }, [
            React.createElement("p", { className: "font-medium", key: "title" }, "Seu código de recuperação:"),
            React.createElement("p", { className: "font-mono text-lg tracking-widest bg-yellow-50 p-2 rounded", key: "code" }, displayedCode),
            React.createElement("p", { className: "text-xs", key: "hint" }, "Utilize este código no passo seguinte")
          ]),
          {
            duration: 15000,
            id: "recovery-code-toast"
          }
        );
        
        setCurrentStep(PasswordRecoveryStep.VERIFY_CODE);
      }
    }
  };

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

  return {
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
  };
};
