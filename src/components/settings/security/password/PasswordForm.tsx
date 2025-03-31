
import { useState } from 'react';
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { passwordSchema, PasswordFormValues } from './types';
import PasswordField from './PasswordField';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import { calculatePasswordStrength } from '@/utils/passwordUtils';

const PasswordForm = () => {
  const { updatePassword } = useAuth();
  const [passwordStrength, setPasswordStrength] = useState(0);

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    }
  });

  const onSubmit = async (data: PasswordFormValues) => {
    try {
      await updatePassword(data.currentPassword, data.newPassword);
      form.reset();
      setPasswordStrength(0);
      toast.success("Senha atualizada com sucesso");
    } catch (error: any) {
      toast.error(error.message || "Erro ao atualizar senha");
    }
  };

  const handleNewPasswordChange = (value: string) => {
    setPasswordStrength(calculatePasswordStrength(value));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <PasswordField
          form={form}
          name="currentPassword"
          label="Senha Atual"
          placeholder="Digite sua senha atual"
        />
        
        <div className="space-y-1">
          <PasswordField
            form={form}
            name="newPassword"
            label="Nova Senha"
            placeholder="Digite sua nova senha"
            description="A senha deve ter no mínimo 6 caracteres, incluir pelo menos uma letra maiúscula e um número."
            onValueChange={handleNewPasswordChange}
          />
          
          {/* Barra de força da senha */}
          {form.watch("newPassword").length > 0 && (
            <PasswordStrengthMeter strength={passwordStrength} />
          )}
        </div>
        
        <PasswordField
          form={form}
          name="confirmPassword"
          label="Confirmar Nova Senha"
          placeholder="Confirme sua nova senha"
        />
        
        <Button 
          type="submit" 
          className="w-full bg-clinic-yellow text-black hover:bg-clinic-yellow/90"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Atualizando..." : "Atualizar Senha"}
        </Button>
      </form>
    </Form>
  );
};

export default PasswordForm;
