
import React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const SupportSection: React.FC = () => {
  return (
    <div className="mt-6 text-center border-t border-gray-100 pt-4">
      <p className="text-sm text-gray-600">
        Problemas para recuperar sua senha?{" "}
        <Button 
          variant="link" 
          className="text-clinic-yellow p-0 h-auto text-sm font-normal"
          onClick={() => {
            toast.info("Entre em contato com o suporte: suporte@minhametaclinica.com.br", {
              duration: 6000,
            });
          }}
        >
          Contatar suporte
        </Button>
      </p>
    </div>
  );
};

export default SupportSection;
