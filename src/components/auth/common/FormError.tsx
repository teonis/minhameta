
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

interface FormErrorProps {
  error: string;
}

const FormError: React.FC<FormErrorProps> = ({ error }) => {
  if (!error) return null;
  
  return (
    <Alert variant="destructive" className="mb-4 sm:mb-6">
      <AlertTriangle className="h-4 w-4 mr-2" />
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );
};

export default FormError;
