
import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { UseFormReturn } from "react-hook-form";
import { VerifyCodeValues } from "../VerifyCodeStep";

interface CodeInputProps {
  form: UseFormReturn<VerifyCodeValues>;
}

const CodeInput: React.FC<CodeInputProps> = ({ form }) => {
  return (
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
  );
};

export default CodeInput;
