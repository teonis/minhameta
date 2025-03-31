import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormError from "@/components/auth/common/FormError";
import { AlertTriangle, CheckCircle, ArrowRight, Clock, RefreshCw } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRecoveryCode } from "@/hooks/auth/useRecoveryCode";
import { toast } from "sonner";
import { 
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Progress } from "@/components/ui/progress";
import { calculatePasswordStrength, getStrengthColor, getStrengthText } from "@/utils/passwordUtils";

const forgotPasswordSchema = z.object({
  email: z.string()
    .email({ message: "Por favor, digite um email válido" })
    .min(1, { message: "Email é obrigatório" })
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

const verifyCodeSchema = z.object({
  code: z.string().length(6, { message: "O código deve ter 6 dígitos" })
});

type VerifyCodeValues = z.infer<typeof verifyCodeSchema>;

const resetPasswordSchema = z.object({
  password: z.string()
    .min(6, { message: "A senha deve ter no mínimo 6 caracteres" })
    .refine(password => /[A-Z]/.test(password), {
      message: "A senha deve conter pelo menos uma letra maiúscula",
    })
    .refine(password => /[0-9]/.test(password), {
      message: "A senha deve conter pelo menos um número",
    }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

enum PasswordRecoveryStep {
  REQUEST_CODE = 1,
  VERIFY_CODE = 2,
  RESET_PASSWORD = 3,
  SUCCESS = 4
}

const ForgotPassword = () => {
  const [currentStep, setCurrentStep] = useState<PasswordRecoveryStep>(PasswordRecoveryStep.REQUEST_CODE);
  const [error, setError] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [recoveryCode, setRecoveryCode] = useState("");
  const [expirationTime, setExpirationTime] = useState<Date | null>(null);
  const [expirationProgress, setExpirationProgress] = useState(100);
  const navigate = useNavigate();
  
  const { 
    sendRecoveryCode, 
    verifyRecoveryCode, 
    resetPasswordWithCode, 
    isLoading, 
    canResend 
  } = useRecoveryCode();

  const requestCodeForm = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const verifyCodeForm = useForm<VerifyCodeValues>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: {
      code: "",
    },
  });

  const resetPasswordForm = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const updateExpirationProgress = () => {
    if (!expirationTime) return;
    
    const now = new Date();
    const expiresAt = new Date(expirationTime);
    const totalDuration = 15 * 60 * 1000; // 15 minutos em milissegundos
    const elapsed = expiresAt.getTime() - now.getTime();
    const remaining = Math.max(0, elapsed);
    const progress = Math.round((remaining / totalDuration) * 100);
    
    setExpirationProgress(progress);
    
    if (progress <= 0) {
      setError("O código expirou. Por favor, solicite um novo código.");
      return;
    }
    
    setTimeout(updateExpirationProgress, 1000);
  };

  const formatTimeRemaining = (): string => {
    if (!expirationTime) return "";
    
    const now = new Date();
    const expiresAt = new Date(expirationTime);
    const remaining = Math.max(0, Math.floor((expiresAt.getTime() - now.getTime()) / 1000));
    
    if (remaining <= 0) return "Expirado";
    
    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;
    
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleRequestCode = async (values: ForgotPasswordValues) => {
    setError("");
    
    try {
      const email = values.email;
      setUserEmail(email);
      
      await sendRecoveryCode(email);
      
      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + 15);
      setExpirationTime(expiresAt);
      
      setTimeout(updateExpirationProgress, 0);
      
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
        }, 3000);
      }
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro ao redefinir sua senha. Tente novamente.");
    }
  };

  const handleResendCode = async () => {
    setError("");
    
    if (!canResend) {
      toast.error("Aguarde antes de solicitar um novo código.");
      return;
    }
    
    try {
      await sendRecoveryCode(userEmail);
      
      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + 15);
      setExpirationTime(expiresAt);
      
      setExpirationProgress(100);
      setTimeout(updateExpirationProgress, 0);
      
      toast.success("Novo código enviado com sucesso!");
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro ao reenviar o código. Tente novamente mais tarde.");
    }
  };

  return (
    <AuthLayout>
      <div className="text-center mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">Recuperar Senha</h1>
        
        <div className="flex justify-between mt-6 mb-8 relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
          
          {[1, 2, 3].map((step) => (
            <div 
              key={step} 
              className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all ${
                currentStep >= step 
                  ? "bg-clinic-yellow text-black" 
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {currentStep > step ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <span>{step}</span>
              )}
            </div>
          ))}
        </div>
        
        <p className="text-sm text-gray-600 mt-2">
          {currentStep === PasswordRecoveryStep.REQUEST_CODE && "Informe seu email para receber um código de recuperação"}
          {currentStep === PasswordRecoveryStep.VERIFY_CODE && "Digite o código de 6 dígitos enviado para seu email"}
          {currentStep === PasswordRecoveryStep.RESET_PASSWORD && "Crie uma nova senha para sua conta"}
          {currentStep === PasswordRecoveryStep.SUCCESS && "Senha alterada com sucesso!"}
        </p>
      </div>
      
      {error && <FormError error={error} />}
      
      {currentStep === PasswordRecoveryStep.REQUEST_CODE && (
        <Form {...requestCodeForm}>
          <form onSubmit={requestCodeForm.handleSubmit(handleRequestCode)} className="space-y-4">
            <FormField
              control={requestCodeForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="seu@email.com" 
                      {...field} 
                      autoComplete="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button
              type="submit"
              className="w-full bg-clinic-yellow text-black hover:bg-clinic-yellow/90 flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? "Enviando..." : "Enviar Código"}
              {!isLoading && <ArrowRight className="h-4 w-4" />}
            </Button>
            
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Lembrou sua senha?{" "}
                <Link to="/login" className="text-clinic-yellow hover:underline">
                  Voltar para o login
                </Link>
              </p>
            </div>
          </form>
        </Form>
      )}
      
      {currentStep === PasswordRecoveryStep.VERIFY_CODE && (
        <div className="space-y-4">
          <Form {...verifyCodeForm}>
            <form onSubmit={verifyCodeForm.handleSubmit(handleVerifyCode)} className="space-y-4">
              <div className="text-center mb-2">
                <p className="text-sm text-gray-600">
                  Enviamos um código de 6 dígitos para <strong>{userEmail}</strong>
                </p>
              </div>
              
              <FormField
                control={verifyCodeForm.control}
                name="code"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Código de Recuperação</FormLabel>
                    <FormControl>
                      <InputOTP
                        maxLength={6}
                        render={({ slots }) => (
                          <InputOTPGroup>
                            {slots.map((slot, index) => (
                              <InputOTPSlot key={index} {...slot} index={index} />
                            ))}
                          </InputOTPGroup>
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-1 text-gray-500">
                    <Clock className="h-3 w-3" />
                    <span>Expira em: {formatTimeRemaining()}</span>
                  </div>
                  <span 
                    className={`font-medium ${
                      expirationProgress < 30 
                        ? "text-red-500" 
                        : expirationProgress < 70 
                          ? "text-yellow-500" 
                          : "text-green-500"
                    }`}
                  >
                    {expirationProgress}%
                  </span>
                </div>
                <Progress 
                  value={expirationProgress} 
                  className={`h-2 ${
                    expirationProgress < 30 
                      ? "bg-red-200" 
                      : expirationProgress < 70 
                        ? "bg-yellow-200" 
                        : "bg-green-200"
                  }`}
                  indicatorClassName={
                    expirationProgress < 30 
                      ? "bg-red-500" 
                      : expirationProgress < 70 
                        ? "bg-yellow-500" 
                        : "bg-green-500"
                  }
                />
              </div>
              
              <Button
                type="submit"
                className="w-full bg-clinic-yellow text-black hover:bg-clinic-yellow/90 flex items-center justify-center gap-2"
                disabled={isLoading}
              >
                {isLoading ? "Verificando..." : "Verificar Código"}
                {!isLoading && <ArrowRight className="h-4 w-4" />}
              </Button>
            </form>
          </Form>
          
          <div className="flex justify-between items-center pt-2 border-t border-gray-100">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-500 text-xs"
              onClick={() => setCurrentStep(PasswordRecoveryStep.REQUEST_CODE)}
            >
              Voltar
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 text-xs flex items-center gap-1"
              onClick={handleResendCode}
              disabled={!canResend || isLoading}
            >
              <RefreshCw className="h-3 w-3" />
              Reenviar código
              {!canResend && <span>(aguarde 2 min)</span>}
            </Button>
          </div>
          
          <div className="mt-6 text-center border-t border-gray-100 pt-4">
            <p className="text-sm text-gray-600">
              Problemas para recuperar sua senha?{" "}
              <Button 
                variant="link" 
                className="text-clinic-yellow p-0 h-auto text-sm font-normal"
                onClick={() => {
                  toast.info("Entre em contato com o suporte: suporte@minhametaclinica.com.br", {
                    duration: 6000,
                  });
                }}
              >
                Contatar suporte
              </Button>
            </p>
          </div>
        </div>
      )}
      
      {currentStep === PasswordRecoveryStep.RESET_PASSWORD && (
        <Form {...resetPasswordForm}>
          <form onSubmit={resetPasswordForm.handleSubmit(handleResetPassword)} className="space-y-4">
            <FormField
              control={resetPasswordForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nova Senha</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Digite sua nova senha"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  
                  {field.value.length > 0 && (
                    <div className="mt-2">
                      <Progress
                        value={calculatePasswordStrength(field.value)}
                        className="h-2"
                        indicatorClassName={getStrengthColor(calculatePasswordStrength(field.value))}
                      />
                      <p className="text-xs mt-1 flex justify-between">
                        <span>Força:</span>
                        <span className={
                          calculatePasswordStrength(field.value) < 30 ? "text-red-500" : 
                          calculatePasswordStrength(field.value) < 70 ? "text-yellow-500" : "text-green-500"
                        }>{getStrengthText(calculatePasswordStrength(field.value))}</span>
                      </p>
                    </div>
                  )}
                  
                  <FormDescription className="text-xs">
                    Sua senha deve ter no mínimo 6 caracteres, incluir pelo menos uma letra maiúscula
                    e um número.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={resetPasswordForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar Nova Senha</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirme sua nova senha"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button
              type="submit"
              className="w-full bg-clinic-yellow text-black hover:bg-clinic-yellow/90"
              disabled={isLoading}
            >
              {isLoading ? "Redefinindo senha..." : "Redefinir Senha"}
            </Button>
            
            <div className="flex justify-start pt-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-500 text-xs"
                onClick={() => setCurrentStep(PasswordRecoveryStep.VERIFY_CODE)}
              >
                Voltar
              </Button>
            </div>
          </form>
        </Form>
      )}
      
      {currentStep === PasswordRecoveryStep.SUCCESS && (
        <div className="text-center">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h1 className="text-xl font-bold mb-3">Senha Redefinida com Sucesso!</h1>
          <p className="text-sm text-gray-600 mb-6">
            Sua senha foi alterada. Redirecionando para a página de login...
          </p>
          <Button 
            className="bg-clinic-yellow text-black hover:bg-clinic-yellow/90"
            onClick={() => navigate("/login", { state: { passwordReset: true } })}
          >
            Ir para o Login
          </Button>
        </div>
      )}
    </AuthLayout>
  );
};

export default ForgotPassword;
