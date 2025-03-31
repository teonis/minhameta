
import { useState } from "react";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormError from "@/components/auth/common/FormError";
import EmailInput from "./request-code/EmailInput";
import SubmitButton from "./request-code/SubmitButton";
import BackToLogin from "./request-code/BackToLogin";

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
          <EmailInput form={form} />
          
          <SubmitButton isLoading={isLoading} />
          
          <BackToLogin />
        </form>
      </Form>
    </>
  );
};

export default RequestCodeStep;
