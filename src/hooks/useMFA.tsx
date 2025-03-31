
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "sonner";

interface UseMFAProps {
  onVerify: (code: string) => Promise<boolean>;
}

export const useMFA = ({ onVerify }: UseMFAProps) => {
  const [isMFAOpen, setIsMFAOpen] = useState(false);
  const [mfaCode, setMFACode] = useState("");
  
  const openMFADialog = () => {
    setIsMFAOpen(true);
    setMFACode("");
  };
  
  const closeMFADialog = () => {
    setIsMFAOpen(false);
    setMFACode("");
  };
  
  const handleVerify = async () => {
    const success = await onVerify(mfaCode);
    if (!success) {
      toast.error("Código inválido. Tente novamente.");
    } else {
      closeMFADialog();
    }
  };
  
  const MFADialog = () => (
    <Dialog open={isMFAOpen} onOpenChange={setIsMFAOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Verificação em duas etapas</DialogTitle>
          <DialogDescription>
            Digite o código de 6 dígitos gerado pelo seu aplicativo autenticador.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex items-center justify-center py-4">
          <InputOTP maxLength={6} value={mfaCode} onChange={setMFACode}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        
        <DialogFooter>
          <Button
            onClick={handleVerify}
            disabled={mfaCode.length !== 6}
          >
            Verificar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
  
  return {
    openMFADialog,
    closeMFADialog,
    MFADialog
  };
};
