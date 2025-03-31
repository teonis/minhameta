
import React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, ArrowRight } from "lucide-react";
import { toast } from "sonner";

interface ActionButtonsProps {
  onBack: () => void;
  onResend: () => Promise<void>;
  isLoading: boolean;
  canResend: boolean;
  isSubmitting: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onBack,
  onResend,
  isLoading,
  canResend,
  isSubmitting
}) => {
  const handleResendCode = async () => {
    if (!canResend) {
      toast.error("Aguarde antes de solicitar um novo código.");
      return;
    }
    
    await onResend();
  };

  return (
    <>
      <Button
        type="submit"
        className="w-full bg-clinic-yellow text-black hover:bg-clinic-yellow/90 flex items-center justify-center gap-2"
        disabled={isLoading || isSubmitting}
      >
        {isSubmitting ? "Verificando..." : "Verificar Código"}
        {!isSubmitting && <ArrowRight className="h-4 w-4" />}
      </Button>
      
      <div className="flex justify-between items-center pt-2 border-t border-gray-100">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-gray-500 text-xs"
          onClick={onBack}
        >
          Voltar
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-500 text-xs flex items-center gap-1"
          onClick={handleResendCode}
          disabled={!canResend || isLoading}
        >
          <RefreshCw className="h-3 w-3" />
          Reenviar código
          {!canResend && <span>(aguarde 2 min)</span>}
        </Button>
      </div>
    </>
  );
};

export default ActionButtons;
