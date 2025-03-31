
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";

interface SubmitButtonProps {
  isLoading: boolean;
  onClick?: () => void;
  text?: string;
  loadingText?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ 
  isLoading, 
  onClick, 
  text = "Enviar Código",
  loadingText = "Enviando..."
}) => {
  return (
    <Button
      type={onClick ? "button" : "submit"}
      className="w-full bg-clinic-yellow text-black hover:bg-clinic-yellow/90 flex items-center justify-center gap-2"
      disabled={isLoading}
      onClick={onClick}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          {loadingText}
        </>
      ) : (
        <>
          {text}
          <ArrowRight className="h-4 w-4" />
        </>
      )}
    </Button>
  );
};

export default SubmitButton;
