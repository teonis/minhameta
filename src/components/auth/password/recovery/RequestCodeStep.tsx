
import { useState } from "react";
import { Link } from "react-router-dom";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormError from "@/components/auth/common/FormError";

export const forgotPasswordSchema = z.object({
  email: z.string()
    .email({ message: "Por favor, digite um email válido" })
    .min(1, { message: "Email é obrigatório" })
});

export type RequestCodeValues = z.infer<typeof forgotPasswordSchema>;

interface RequestCodeStepProps {
  onSubmit: (values: RequestCodeValues) => Promise<void>;
  error: string;
  isLoading: boolean;
}

const RequestCodeStep = ({ onSubmit, error, isLoading }: RequestCodeStepProps) => {
  const form = useForm<RequestCodeValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  return (
    <>
      {error && <FormError error={error} />}
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
    </>
  );
};

export default RequestCodeStep;
