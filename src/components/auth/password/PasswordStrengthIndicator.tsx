
import { Progress } from "@/components/ui/progress";
import { getStrengthColor, getStrengthText } from "@/utils/passwordUtils";

interface PasswordStrengthIndicatorProps {
  strength: number;
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ strength }) => {
  return (
    <div className="mt-2">
      <Progress 
        value={strength} 
        className={`h-2`}
        indicatorClassName={getStrengthColor(strength)}
      />
      <p className="text-xs text-gray-500 mt-1">
        Força: <span className={
          strength < 30 ? "text-red-500" : 
          strength < 70 ? "text-yellow-500" : "text-green-500"
        }>{getStrengthText(strength)}</span>
      </p>
    </div>
  );
};

export default PasswordStrengthIndicator;
