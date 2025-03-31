
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface SubmitButtonProps {
  isLoading: boolean;
  onClick?: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ isLoading, onClick }) => {
  return (
    <Button
      type={onClick ? "button" : "submit"}
      className="w-full bg-clinic-yellow text-black hover:bg-clinic-yellow/90 flex items-center justify-center gap-2"
      disabled={isLoading}
      onClick={onClick}
    >
      {isLoading ? "Enviando..." : "Enviar Código"}
      {!isLoading && <ArrowRight className="h-4 w-4" />}
    </Button>
  );
};

export default SubmitButton;
