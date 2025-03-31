
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SuccessStepProps {
  redirectToLogin: () => void;
}

const SuccessStep = ({ redirectToLogin }: SuccessStepProps) => {
  return (
    <div className="text-center">
      <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
      <h1 className="text-xl font-bold mb-3">Senha Redefinida com Sucesso!</h1>
      <p className="text-sm text-gray-600 mb-6">
        Sua senha foi alterada. Redirecionando para a página de login...
      </p>
      <Button 
        className="bg-clinic-yellow text-black hover:bg-clinic-yellow/90"
        onClick={redirectToLogin}
      >
        Ir para o Login
      </Button>
    </div>
  );
};

export default SuccessStep;
