
import { useState, useEffect } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Progress } from "@/components/ui/progress";
import { Clock, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import FormError from "@/components/auth/common/FormError";

export const verifyCodeSchema = z.object({
  code: z.string().length(6, { message: "O código deve ter 6 dígitos" })
});

export type VerifyCodeValues = z.infer<typeof verifyCodeSchema>;

interface VerifyCodeStepProps {
  userEmail: string;
  expirationTime: Date | null;
  onSubmit: (values: VerifyCodeValues) => Promise<void>;
  onBack: () => void;
  onResend: () => Promise<void>;
  error: string;
  isLoading: boolean;
  canResend: boolean;
}

const VerifyCodeStep = ({ 
  userEmail, 
  expirationTime, 
  onSubmit, 
  onBack, 
  onResend, 
  error, 
  isLoading, 
  canResend 
}: VerifyCodeStepProps) => {
  const [expirationProgress, setExpirationProgress] = useState(100);
  
  const form = useForm<VerifyCodeValues>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: {
      code: "",
    },
  });

  useEffect(() => {
    const updateExpirationProgress = () => {
      if (!expirationTime) return;
      
      const now = new Date();
      const expiresAt = new Date(expirationTime);
      const totalDuration = 15 * 60 * 1000; // 15 minutos em milissegundos
      const elapsed = expiresAt.getTime() - now.getTime();
      const remaining = Math.max(0, elapsed);
      const progress = Math.round((remaining / totalDuration) * 100);
      
      setExpirationProgress(progress);
      
      if (progress > 0) {
        setTimeout(updateExpirationProgress, 1000);
      }
    };

    updateExpirationProgress();
    
    return () => {
      // Cleanup timeout on unmount
    };
  }, [expirationTime]);

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

  const handleResendCode = async () => {
    if (!canResend) {
      toast.error("Aguarde antes de solicitar um novo código.");
      return;
    }
    
    await onResend();
  };

  return (
    <div className="space-y-4">
      {error && <FormError error={error} />}
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="text-center mb-2">
            <p className="text-sm text-gray-600">
              Enviamos um código de 6 dígitos para <strong>{userEmail}</strong>
            </p>
          </div>
          
          <FormField
            control={form.control}
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
          onClick={onBack}
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
  );
};

export default VerifyCodeStep;
