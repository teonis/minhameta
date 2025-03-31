
import { Progress } from "@/components/ui/progress";
import { getStrengthColor, getStrengthText } from "@/utils/passwordUtils";

interface PasswordStrengthMeterProps {
  strength: number;
  showText?: boolean;
}

const PasswordStrengthMeter = ({ strength, showText = true }: PasswordStrengthMeterProps) => {
  return (
    <div className="mt-2">
      <Progress 
        value={strength} 
        className="h-2" 
        indicatorClassName={getStrengthColor(strength)}
      />
      {showText && (
        <div className="flex justify-between mt-1">
          <p className="text-xs text-gray-500">
            Força: <span className={
              strength < 30 ? "text-red-500" : 
              strength < 70 ? "text-yellow-500" : "text-green-500"
            }>{getStrengthText(strength)}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default PasswordStrengthMeter;
