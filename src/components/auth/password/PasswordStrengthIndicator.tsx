
import { Progress } from "@/components/ui/progress";

interface PasswordStrengthIndicatorProps {
  strength: number;
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ strength }) => {
  const getStrengthColor = (strength: number) => {
    if (strength < 30) return "bg-red-500";
    if (strength < 70) return "bg-yellow-500";
    return "bg-green-500";
  };
  
  const getStrengthText = (strength: number) => {
    if (strength < 30) return "Fraca";
    if (strength < 70) return "Média";
    return "Forte";
  };

  return (
    <div className="mt-2">
      <Progress value={strength} className={`h-2 ${getStrengthColor(strength)}`} />
      <p className="text-xs text-gray-500 mt-1">
        Força: {getStrengthText(strength)}
      </p>
    </div>
  );
};

export default PasswordStrengthIndicator;
