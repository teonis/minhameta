
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

// Define schema for validation
const forgotPasswordSchema = z.object({
  email: z.string()
    .email({ message: "Por favor, digite um email válido" })
    .min(1, { message: "Email é obrigatório" })
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

// Define schema for code verification
const verifyCodeSchema = z.object({
  code: z.string().length(6, { message: "O código deve ter 6 dígitos" })
});

type VerifyCodeValues = z.infer<typeof verifyCodeSchema>;

// Define schema for password reset
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

// Enum para controlar as etapas do processo
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
  
  // Formulário para solicitar código
  const requestCodeForm = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  
  // Formulário para verificar código
  const verifyCodeForm = useForm<VerifyCodeValues>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: {
      code: "",
    },
  });
  
  // Formulário para redefinir senha
  const resetPasswordForm = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // Calcular força da senha
  const calculatePasswordStrength = (password: string) => {
    if (password.length === 0) return 0;
    
    let score = 0;
    
    // Base score for length
    if (password.length >= 6) score += 1;
    if (password.length >= 8) score += 1;
    if (password.length >= 10) score += 1;
    
    // Score for complexity
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
    // Check for common patterns
    if (!/123|abc|qwerty|password|senha/i.test(password)) score += 1;
    
    // Normalize score to percentage (0-100)
    return Math.min(100, Math.round((score / 8) * 100));
  };
  
  // Obter cor com base na força da senha
  const getStrengthColor = (strength: number) => {
    if (strength < 30) return "bg-red-500";
    if (strength < 70) return "bg-yellow-500";
    return "bg-green-500";
  };
  
  // Obter texto com base na força da senha
  const getStrengthText = (strength: number) => {
    if (strength < 30) return "Fraca";
    if (strength < 70) return "Média";
    return "Forte";
  };
  
  // Atualizar barra de progresso da expiração
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
      // Código expirado
      setError("O código expirou. Por favor, solicite um novo código.");
      return;
    }
    
    // Atualizar a cada segundo
    setTimeout(updateExpirationProgress, 1000);
  };
  
  // Formatar tempo restante
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
  
  // Solicitar código de recuperação
  const handleRequestCode = async (values: ForgotPasswordValues) => {
    setError("");
    
    try {
      const email = values.email;
      setUserEmail(email);
      
      // Enviar código para o email
      await sendRecoveryCode(email);
      
      // Definir expiração (15 minutos a partir de agora)
      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + 15);
      setExpirationTime(expiresAt);
      
      // Iniciar atualização da barra de progresso
      setTimeout(updateExpirationProgress, 0);
      
      toast.success("Código de recuperação enviado com sucesso!");
      setCurrentStep(PasswordRecoveryStep.VERIFY_CODE);
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro ao enviar o código. Tente novamente mais tarde.");
    }
  };
  
  // Verificar código informado
  const handleVerifyCode = async (values: VerifyCodeValues) => {
    setError("");
    
    try {
      const code = values.code;
      setRecoveryCode(code);
      
      // Verificar código
      const isVerified = await verifyRecoveryCode(userEmail, code);
      
      if (isVerified) {
        toast.success("Código verificado com sucesso!");
        setCurrentStep(PasswordRecoveryStep.RESET_PASSWORD);
      }
    } catch (err: any) {
      setError(err.message || "Código inválido. Verifique e tente novamente.");
    }
  };
  
  // Redefinir senha após verificação do código
  const handleResetPassword = async (values: ResetPasswordValues) => {
    setError("");
    
    try {
      // Redefinir senha
      const success = await resetPasswordWithCode(userEmail, recoveryCode, values.password);
      
      if (success) {
        toast.success("Senha redefinida com sucesso!");
        setCurrentStep(PasswordRecoveryStep.SUCCESS);
        
        // Redirecionar para login após 3 segundos
        setTimeout(() => {
          navigate("/login", { state: { passwordReset: true } });
        }, 3000);
      }
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro ao redefinir sua senha. Tente novamente.");
    }
  };
  
  // Reenviar código
  const handleResendCode = async () => {
    setError("");
    
    if (!canResend) {
      toast.error("Aguarde antes de solicitar um novo código.");
      return;
    }
    
    try {
      // Enviar novo código
      await sendRecoveryCode(userEmail);
      
      // Atualizar expiração
      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + 15);
      setExpirationTime(expiresAt);
      
      // Reiniciar barra de progresso
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
        
        {/* Indicador de etapas */}
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
      
      {/* Etapa 1: Solicitar código */}
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
      
      {/* Etapa 2: Verificar código */}
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
              
              {/* Barra de progresso de expiração */}
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
                  // Exibir modal ou redirecionar para página de contato
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
      
      {/* Etapa 3: Redefinir senha */}
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
                  
                  {/* Indicador de força da senha */}
                  {field.value.length > 0 && (
                    <div className="mt-2">
                      <Progress
                        value={calculatePasswordStrength(field.value)}
                        className={`h-2 ${getStrengthColor(calculatePasswordStrength(field.value))}`}
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
      
      {/* Etapa 4: Sucesso */}
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
