
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/auth";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PasswordField from "./password/PasswordField";
import UserTypeSelector from "./common/UserTypeSelector";
import FormError from "./common/FormError";

// Define form validation schema
const registerFormSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  userType: z.enum(["patient", "professional"]),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerFormSchema>;

interface RegisterFormProps {
  returnTo: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ returnTo }) => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { register } = useAuth();
  
  // Setup react-hook-form with zod validation
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      userType: "patient",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setError("");
    
    try {
      const role = values.userType === "professional" 
        ? UserRole.PROFESSIONAL 
        : UserRole.PATIENT;
      
      await register(values.name, values.email, values.password, role);
      
      toast.success("Conta criada com sucesso! Redirecionando...");
      navigate(returnTo);
    } catch (err: any) {
      setError(err.message || "Falha no cadastro. Tente novamente mais tarde.");
    }
  };

  return (
    <>
      <FormError error={error} />
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">Nome Completo</FormLabel>
                <FormControl>
                  <Input placeholder="Seu nome completo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">Email</FormLabel>
                <FormControl>
                  <Input placeholder="seu@email.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="userType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">Tipo de Usuário</FormLabel>
                <FormControl>
                  <UserTypeSelector 
                    userType={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">Senha</FormLabel>
                <FormControl>
                  <PasswordField 
                    value={field.value} 
                    onChange={field.onChange}
                    showStrengthIndicator
                  />
                </FormControl>
                <p className="text-xs text-gray-500 mt-1">
                  A senha deve ter pelo menos 6 caracteres.
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">Confirmar Senha</FormLabel>
                <FormControl>
                  <PasswordField 
                    value={field.value} 
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button
            type="submit"
            className="w-full bg-clinic-yellow text-black font-medium hover:bg-clinic-yellow/90 transition-colors"
            disabled={form.formState.isSubmitting}
          >
            Cadastrar
          </Button>
          
          <div className="text-center">
            <p className="text-sm sm:text-base text-gray-600">
              Já tem uma conta?{" "}
              <Link to="/login" className="text-clinic-yellow hover:underline">
                Faça login
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </>
  );
};

export default RegisterForm;
