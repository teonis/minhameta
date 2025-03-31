
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const SecuritySettings = () => {
  const { updatePassword } = useAuth();
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    setError(""); // Clear error when user types
  };
  
  const validatePassword = (password: string) => {
    const minLength = 10;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    if (password.length < minLength) {
      return `A senha deve ter pelo menos ${minLength} caracteres`;
    }
    
    if (!hasUpperCase) {
      return "A senha deve conter pelo menos uma letra maiúscula";
    }
    
    if (!hasLowerCase) {
      return "A senha deve conter pelo menos uma letra minúscula";
    }
    
    if (!hasNumber) {
      return "A senha deve conter pelo menos um número";
    }
    
    if (!hasSpecialChar) {
      return "A senha deve conter pelo menos um caractere especial";
    }
    
    return "";
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Validate inputs
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setError("Todos os campos são obrigatórios");
      return;
    }
    
    // Validate new password
    const passwordError = validatePassword(passwordData.newPassword);
    if (passwordError) {
      setError(passwordError);
      return;
    }
    
    // Check if passwords match
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Call authentication service to update password
      await updatePassword(passwordData.currentPassword, passwordData.newPassword);
      
      // Clear form
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
      
      toast.success("Senha atualizada com sucesso!");
    } catch (err) {
      setError("Não foi possível atualizar a senha. Verifique se a senha atual está correta.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Alterar Senha</h2>
        <p className="text-muted-foreground mb-6">
          Sua senha deve ter pelo menos 10 caracteres e incluir letras maiúsculas, minúsculas, números e caracteres especiais.
        </p>
        
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 mb-6">
            <div className="grid gap-2">
              <Label htmlFor="currentPassword">Senha Atual</Label>
              <Input
                id="currentPassword"
                name="currentPassword"
                type="password"
                value={passwordData.currentPassword}
                onChange={handleChange}
                placeholder="Digite sua senha atual"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="newPassword">Nova Senha</Label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                value={passwordData.newPassword}
                onChange={handleChange}
                placeholder="Digite sua nova senha"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirme a Nova Senha</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={passwordData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirme sua nova senha"
              />
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="bg-clinic-yellow text-black hover:bg-clinic-yellow/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Atualizando..." : "Atualizar Senha"}
          </Button>
        </form>
      </div>
      
      <div className="border-t border-gray-200 pt-6 mt-8">
        <h3 className="text-lg font-semibold mb-4">Sessões Ativas</h3>
        <p className="text-muted-foreground mb-4">
          Você está atualmente conectado neste dispositivo.
        </p>
        <Button variant="outline" className="border-red-300 text-red-500 hover:bg-red-50 hover:text-red-600">
          Encerrar Todas as Sessões
        </Button>
      </div>
    </div>
  );
};

export default SecuritySettings;
