
import React, { useState, useEffect } from "react";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { VerifyCodeValues } from "../VerifyCodeStep";

interface CodeInputProps {
  form: UseFormReturn<VerifyCodeValues>;
}

const CodeInput: React.FC<CodeInputProps> = ({ form }) => {
  const [focusedInput, setFocusedInput] = useState(false);

  // Auto focus the input when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      const input = document.getElementById('recovery-code-input');
      if (input) {
        input.focus();
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <FormField
      control={form.control}
      name="code"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              id="recovery-code-input"
              type="text"
              placeholder="Digite o código de 6 dígitos"
              pattern="[0-9]*"
              inputMode="numeric"
              maxLength={6}
              autoComplete="one-time-code"
              className={`text-center text-xl tracking-widest font-mono ${
                focusedInput ? 'bg-yellow-50' : ''
              }`}
              onFocus={() => setFocusedInput(true)}
              onBlur={() => setFocusedInput(false)}
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
