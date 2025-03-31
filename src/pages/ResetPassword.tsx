
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

// Novo esquema de validação com requisitos mínimos
const passwordSchema = z.object({
  password: z.string()
    .min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

type PasswordFormValues = z.infer<typeof passwordSchema>;

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState<string | null>(null);
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();
  const { updatePassword } = useAuth();
  const isMobile = useIsMobile();

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    setToken(tokenFromUrl);
    
    // In a real implementation, this would verify the token with the backend
    // For demo purposes, we'll just check if it exists
    if (tokenFromUrl) {
      // Simple check for demo - a real implementation would verify this token with the server
      const isValidToken = tokenFromUrl.length > 20;
      setTokenValid(isValidToken);
      
      if (!isValidToken) {
        toast.error("Link de redefinição inválido ou expirado. Por favor, solicite um novo.");
      }
    } else {
      setTokenValid(false);
      toast.error("Link de redefinição inválido. Por favor, solicite um novo.");
    }
  }, [searchParams]);

  // Função atualizada para calcular a força da senha
  const calculatePasswordStrength = (password: string) => {
    if (password.length === 0) return 0;
    
    let score = 0;
    
    // Pontuação base para comprimento
    if (password.length >= 6) score += 1;
    if (password.length >= 8) score += 1;
    
    // Pontuação para complexidade
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
    // Normaliza score para percentual (0-100)
    return Math.min(100, (score / 6) * 100);
  };
  
  // Função para obter a cor da barra de força
  const getStrengthColor = (strength: number) => {
    if (strength < 30) return "bg-red-500";
    if (strength < 70) return "bg-yellow-500";
    return "bg-green-500";
  };
  
  // Função para obter o texto do nível de força
  const getStrengthText = (strength: number) => {
    if (strength < 30) return "Fraca";
    if (strength < 70) return "Média";
    return "Forte";
  };

  const onSubmit = async (data: PasswordFormValues) => {
    if (!token || !tokenValid) {
      toast.error("Link de redefinição inválido ou expirado. Por favor, solicite um novo.");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real implementation, you would send the token and new password to your API
      // For demo purposes, we'll simulate success after a short delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate API call
      // await updatePassword(data.password, token);
      
      toast.success("Sua senha foi alterada com sucesso!");
      setTimeout(() => {
        navigate("/login", { state: { passwordReset: true } });
      }, 2000);
    } catch (error: any) {
      toast.error(error.message || "Ocorreu um erro ao redefinir sua senha. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // If we're still checking the token validity, show loading
  if (tokenValid === null) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p>Verificando seu link de redefinição...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-6 sm:py-10 px-4">
        <div className="w-full max-w-md p-6 sm:p-8 bg-white rounded-lg shadow-md">
          {!tokenValid ? (
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h1 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Link Inválido ou Expirado</h1>
              <p className="text-sm sm:text-base text-gray-600 mb-6">
                O link de redefinição de senha que você usou é inválido ou expirou.
              </p>
              <Link to="/forgot-password" className="text-clinic-yellow hover:underline text-sm sm:text-base">
                Solicitar novo link
              </Link>
              <div className="mt-4 border-t pt-4">
                <Link to="/login" className="text-gray-600 hover:text-clinic-yellow text-sm sm:text-base">
                  Voltar para o login
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center mb-6 sm:mb-8">
                <h1 className="text-xl sm:text-2xl font-bold">Criar Nova Senha</h1>
                <p className="text-sm sm:text-base text-gray-600 mt-2">
                  Digite sua nova senha para a Clínica Rocha | Minha Meta
                </p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nova Senha</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Digite sua nova senha"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                setPasswordStrength(calculatePasswordStrength(e.target.value));
                              }}
                              aria-describedby="password-requirements"
                            />
                          </FormControl>
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowPassword(!showPassword)}
                            tabIndex={-1}
                            aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                            ) : (
                              <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                            )}
                          </button>
                        </div>
                        
                        {/* Barra de força da senha atualizada */}
                        {field.value.length > 0 && (
                          <div className="mt-2">
                            <Progress
                              value={passwordStrength}
                              className="h-2"
                            />
                            <p className="text-xs mt-1" style={{ color: getStrengthColor(passwordStrength).replace('bg-', 'text-') }}>
                              {getStrengthText(passwordStrength)}
                            </p>
                          </div>
                        )}
                        
                        <FormDescription id="password-requirements" className="text-xs text-gray-500 mt-2">
                          Sua senha deve ter no mínimo 6 caracteres. Para maior segurança, inclua letras maiúsculas,
                          minúsculas, números e caracteres especiais.
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
                        <div className="relative">
                          <FormControl>
                            <Input
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Confirme sua nova senha"
                              {...field}
                            />
                          </FormControl>
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            tabIndex={-1}
                            aria-label={showConfirmPassword ? "Esconder senha" : "Mostrar senha"}
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                            ) : (
                              <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                            )}
                          </button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-clinic-yellow text-black hover:bg-clinic-yellow/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Redefinindo senha..." : "Redefinir Senha"}
                  </Button>
                </form>
              </Form>

              <div className="mt-6 text-center">
                <Link to="/login" className="text-gray-600 hover:text-clinic-yellow text-sm sm:text-base">
                  Voltar para o login
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
      
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 flex justify-around z-10">
          <Link to="/" className="flex flex-col items-center justify-center text-gray-700 hover:text-clinic-yellow">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-xs mt-1">Início</span>
          </Link>
          
          <Link to="/login" className="flex flex-col items-center justify-center text-gray-700 hover:text-clinic-yellow">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-xs mt-1">Login</span>
          </Link>
          
          <Link to="/register" className="flex flex-col items-center justify-center text-gray-700 hover:text-clinic-yellow">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            <span className="text-xs mt-1">Cadastro</span>
          </Link>
        </div>
      )}
      
      {isMobile && <div className="h-16"></div>}
      
      <Footer />
    </div>
  );
};

export default ResetPassword;
