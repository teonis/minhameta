
import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { RequestCodeValues } from "../RequestCodeStep";

interface EmailInputProps {
  form: UseFormReturn<RequestCodeValues>;
}

const EmailInput: React.FC<EmailInputProps> = ({ form }) => {
  return (
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
  );
};

export default EmailInput;
