
import { useState } from "react";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormError from "@/components/auth/common/FormError";

// Import our new component files
import VerifyCodeHeader from "./verify-code/VerifyCodeHeader";
import ExpirationTimer from "./verify-code/ExpirationTimer";
import CodeInput from "./verify-code/CodeInput";
import ActionButtons from "./verify-code/ActionButtons";
import SupportSection from "./verify-code/SupportSection";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<VerifyCodeValues>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: {
      code: "",
    },
  });

  const handleSubmit = async (values: VerifyCodeValues) => {
    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      {error && <FormError error={error} />}
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <VerifyCodeHeader userEmail={userEmail} />
          <CodeInput form={form} />
          <ExpirationTimer expirationTime={expirationTime} />
          <ActionButtons 
            onBack={onBack}
            onResend={onResend}
            isLoading={isLoading}
            canResend={canResend}
            isSubmitting={isSubmitting}
          />
        </form>
      </Form>
      
      <SupportSection />
    </div>
  );
};

export default VerifyCodeStep;
