
import { AlertTriangle } from "lucide-react";

interface FormErrorProps {
  error: string;
}

const FormError: React.FC<FormErrorProps> = ({ error }) => {
  if (!error) return null;
  
  return (
    <div 
      className="bg-destructive/10 border-l-4 border-destructive text-destructive p-3 sm:p-4 mb-4 sm:mb-6 text-sm sm:text-base flex items-start" 
      role="alert"
    >
      <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
      <p>{error}</p>
    </div>
  );
};

export default FormError;
