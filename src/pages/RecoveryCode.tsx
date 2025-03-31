
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "@/components/auth/AuthLayout";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRecoveryCode } from "@/hooks/auth/useRecoveryCode";
import FormError from "@/components/auth/common/FormError";
import EmailInput from "@/components/auth/password/recovery/request-code/EmailInput";
import SubmitButton from "@/components/auth/password/recovery/request-code/SubmitButton";
import BackToLogin from "@/components/auth/password/recovery/request-code/BackToLogin";
import { Copy, CheckCircle, AlertTriangle } from "lucide-react";

const recoveryCodeSchema = z.object({
  email: z.string()
    .email({ message: "Por favor, digite um email válido" })
    .min(1, { message: "Email é obrigatório" })
});

type RecoveryCodeValues = z.infer<typeof recoveryCodeSchema>;

const RecoveryCode = () => {
  const [error, setError] = useState("");
  const [showCodeDialog, setShowCodeDialog] = useState(false);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  
  const { 
    useFallbackRecoveryCode, 
    isLoading, 
    displayedCode,
    clearDisplayedCode
  } = useRecoveryCode();

  const form = useForm<RecoveryCodeValues>({
    resolver: zodResolver(recoveryCodeSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleGetCode = async (values: RecoveryCodeValues) => {
    setError("");
    
    try {
      const email = values.email;
      
      await useFallbackRecoveryCode(email);
      
      setShowCodeDialog(true);
      toast.success("Código de recuperação alternativo gerado com sucesso!");
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro ao gerar o código. Tente novamente mais tarde.");
    }
  };

  const handleContinue = () => {
    // Don't clear the displayed code anymore so it can be used in the next page
    // clearDisplayedCode();
    setShowCodeDialog(false);
    
    navigate("/forgot-password", { 
      state: { 
        alternativeCodeGenerated: true,
        recoveryEmail: form.getValues().email
      } 
    });
  };

  const copyToClipboard = () => {
    if (displayedCode) {
      navigator.clipboard.writeText(displayedCode);
      setCopied(true);
      toast.success("Código copiado para a área de transferência!");
      
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    }
  };

  return (
    <AuthLayout>
      <div className="text-center mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">Recuperação Alternativa</h1>
        <p className="text-sm text-gray-600 mt-2">
          Utilize esta opção se você não estiver recebendo emails de recuperação
        </p>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          {error && <FormError error={error} />}
          
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md flex items-start">
            <AlertTriangle className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-blue-700">
              Informe seu email para gerar um código de recuperação alternativo 
              que será exibido diretamente na tela.
            </p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleGetCode)} className="space-y-4">
              <EmailInput form={form} />
              
              <SubmitButton isLoading={isLoading} />
              
              <BackToLogin />
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <Dialog open={showCodeDialog} onOpenChange={setShowCodeDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Seu Código de Recuperação</DialogTitle>
            <DialogDescription>
              Anote este código. Você precisará dele para redefinir sua senha.
            </DialogDescription>
          </DialogHeader>
          
          <div className="my-6">
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md text-center relative">
              <h3 className="text-xl font-mono tracking-widest">{displayedCode}</h3>
              <p className="text-xs text-gray-500 mt-2">Este código expira em 15 minutos</p>
              
              <Button 
                onClick={copyToClipboard}
                variant="outline" 
                size="sm"
                className="absolute top-2 right-2"
              >
                {copied ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
              <p className="text-sm text-amber-700">
                <strong>Importante:</strong> Não feche esta janela até copiar ou anotar seu código. 
                Ele não poderá ser recuperado novamente.
              </p>
            </div>
          </div>
          
          <Button 
            onClick={handleContinue}
            className="w-full bg-clinic-yellow text-black hover:bg-clinic-yellow/90"
          >
            Continuar para Redefinição de Senha
          </Button>
        </DialogContent>
      </Dialog>
    </AuthLayout>
  );
};

export default RecoveryCode;
