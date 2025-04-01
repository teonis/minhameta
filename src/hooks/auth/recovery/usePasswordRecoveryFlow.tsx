
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  
  const { 
    sendRecoveryCode, 
    verifyRecoveryCode, 
    resetPasswordWithCode, 
    isLoading
  } = useRecoveryCode();

  const handleRequestCode = async (values: RequestCodeValues) => {
    setError("");
    
    try {
      const email = values.email;
      setUserEmail(email);
      
      await sendRecoveryCode(email);
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
        toast.success("Senha redefinida com sucesso!");
        setCurrentStep(PasswordRecoveryStep.SUCCESS);
        
        setTimeout(() => {
          navigate("/login", { state: { passwordReset: true } });
        }, 2000);
      }
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro ao redefinir sua senha. Tente novamente.");
    }
  };

  const redirectToLogin = () => {
    navigate("/login");
  };

  return {
    currentStep,
    setCurrentStep,
    error,
    userEmail,
    isLoading,
    handleRequestCode,
    handleVerifyCode,
    handleResetPassword,
    redirectToLogin
  };
};
