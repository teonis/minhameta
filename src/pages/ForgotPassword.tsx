
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AuthLayout from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormError from "@/components/auth/common/FormError";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Define schema for validation
const forgotPasswordSchema = z.object({
  email: z.string()
    .email({ message: "Por favor, digite um email válido" })
    .min(1, { message: "Email é obrigatório" })
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  
  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  
  const onSubmit = async (values: ForgotPasswordValues) => {
    setError("");
    
    try {
      await resetPassword(values.email);
      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro. Tente novamente mais tarde.");
    }
  };
  
  return (
    <AuthLayout>
      {isSubmitted ? (
        <div className="text-center">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h1 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Verifique seu email</h1>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
            Se existe uma conta associada ao email <strong>{form.getValues().email}</strong>, enviamos instruções para redefinir sua senha.
          </p>
          <Button 
            variant="link" 
            className="text-clinic-yellow" 
            onClick={() => navigate("/login")}
          >
            Voltar para o login
          </Button>
        </div>
      ) : (
        <>
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl font-bold">Recuperar Senha</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-2">
              Digite seu email para receber instruções de recuperação de senha
            </p>
          </div>
          
          {error && <FormError error={error} />}
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
              <FormField
                control={form.control}
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
                className="w-full bg-clinic-yellow text-black hover:bg-clinic-yellow/90"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Enviando..." : "Enviar Instruções"}
              </Button>
              
              <div className="mt-4 sm:mt-6 text-center">
                <p className="text-sm sm:text-base text-gray-600">
                  Lembrou sua senha?{" "}
                  <Link to="/login" className="text-clinic-yellow hover:underline">
                    Voltar para o login
                  </Link>
                </p>
              </div>
            </form>
          </Form>
        </>
      )}
    </AuthLayout>
  );
};

export default ForgotPassword;
