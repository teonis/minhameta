
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface UserTypeSelectorProps {
  userType: string;
  onChange: (userType: string) => void;
}

const UserTypeSelector: React.FC<UserTypeSelectorProps> = ({ userType, onChange }) => {
  return (
    <RadioGroup
      value={userType}
      onValueChange={onChange}
      className="flex gap-4 sm:gap-6"
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="patient" id="patient" />
        <Label htmlFor="patient" className="cursor-pointer text-sm sm:text-base">
          Paciente
        </Label>
      </div>
      
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="professional" id="professional" />
        <Label htmlFor="professional" className="cursor-pointer text-sm sm:text-base">
          Profissional
        </Label>
      </div>
    </RadioGroup>
  );
};

export default UserTypeSelector;
