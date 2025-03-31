
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface SubmitButtonProps {
  isLoading: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ isLoading }) => {
  return (
    <Button
      type="submit"
      className="w-full bg-clinic-yellow text-black hover:bg-clinic-yellow/90 flex items-center justify-center gap-2"
      disabled={isLoading}
    >
      {isLoading ? "Enviando..." : "Enviar Código"}
      {!isLoading && <ArrowRight className="h-4 w-4" />}
    </Button>
  );
};

export default SubmitButton;
