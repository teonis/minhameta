
import { useState } from 'react';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from 'lucide-react';
import { UseFormReturn } from "react-hook-form";
import { PasswordFormValues } from './types';

interface PasswordFieldProps {
  form: UseFormReturn<PasswordFormValues>;
  name: "currentPassword" | "newPassword" | "confirmPassword";
  label: string;
  placeholder: string;
  description?: string;
  onValueChange?: (value: string) => void;
}

const PasswordField = ({ 
  form, 
  name, 
  label, 
  placeholder, 
  description,
  onValueChange 
}: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <div className="relative">
            <FormControl>
              <Input
                type={showPassword ? "text" : "password"}
                {...field}
                placeholder={placeholder}
                onChange={(e) => {
                  field.onChange(e);
                  if (onValueChange) {
                    onValueChange(e.target.value);
                  }
                }}
              />
            </FormControl>
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-gray-500" />
              ) : (
                <Eye className="h-4 w-4 text-gray-500" />
              )}
            </button>
          </div>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PasswordField;
