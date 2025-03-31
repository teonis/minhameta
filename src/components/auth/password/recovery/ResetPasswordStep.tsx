
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { calculatePasswordStrength, getStrengthColor, getStrengthText } from "@/utils/passwordUtils";
import FormError from "@/components/auth/common/FormError";

export const resetPasswordSchema = z.object({
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

export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

interface ResetPasswordStepProps {
  onSubmit: (values: ResetPasswordValues) => Promise<void>;
  onBack: () => void;
  error: string;
  isLoading: boolean;
}

const ResetPasswordStep = ({ onSubmit, onBack, error, isLoading }: ResetPasswordStepProps) => {
  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <>
      {error && <FormError error={error} />}
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nova Senha</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Digite sua nova senha"
                    {...field}
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
            control={form.control}
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
              onClick={onBack}
            >
              Voltar
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default ResetPasswordStep;
