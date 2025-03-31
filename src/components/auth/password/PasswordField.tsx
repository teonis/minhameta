
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";
import { calculatePasswordStrength } from "@/utils/passwordUtils";

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
