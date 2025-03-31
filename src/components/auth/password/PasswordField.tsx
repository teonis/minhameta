
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";

interface PasswordFieldProps {
  value: string;
  onChange: (value: string) => void;
  showStrengthIndicator?: boolean;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  value,
  onChange,
  showStrengthIndicator = false
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  
  const calculatePasswordStrength = (password: string) => {
    if (password.length === 0) return 0;
    
    let score = 0;
    
    if (password.length >= 6) score += 1;
    if (password.length >= 8) score += 1;
    
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
    return Math.min(100, (score / 6) * 100);
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    onChange(newPassword);
    setPasswordStrength(calculatePasswordStrength(newPassword));
  };

  return (
    <div className="space-y-2">
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="••••••"
          value={value}
          onChange={handlePasswordChange}
          className="pr-10"
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
          ) : (
            <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
          )}
        </button>
      </div>
      
      {showStrengthIndicator && value.length > 0 && (
        <PasswordStrengthIndicator strength={passwordStrength} />
      )}
    </div>
  );
};

export default PasswordField;
