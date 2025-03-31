
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { Progress } from "@/components/ui/progress";

const PasswordSection = () => {
  const { updatePassword } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Função para calcular a força da senha
  const calculatePasswordStrength = (password: string) => {
    if (password.length === 0) return 0;
    
    let score = 0;
    
    // Pontuação base para comprimento
    if (password.length >= 6) score += 1;
    if (password.length >= 8) score += 1;
    
    // Pontuação para complexidade
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
    // Normaliza score para percentual (0-100)
    return Math.min(100, (score / 6) * 100);
  };
  
  // Função para obter o texto do nível de força
  const getStrengthText = (strength: number) => {
    if (strength < 30) return "Fraca";
    if (strength < 70) return "Média";
    return "Forte";
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword.length < 6) {
      toast.error("A senha deve ter no mínimo 6 caracteres");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }
    
    try {
      await updatePassword(currentPassword, newPassword);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setPasswordStrength(0);
    } catch (error) {
      toast.error("Erro ao atualizar senha");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Shield className="h-5 w-5 text-clinic-yellow" />
          Alterar Senha
        </CardTitle>
        <CardDescription>
          Atualize sua senha regularmente para maior segurança
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handlePasswordUpdate} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Senha Atual</Label>
            <div className="relative">
              <Input
                id="current-password"
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="new-password">Nova Senha</Label>
            <div className="relative">
              <Input
                id="new-password"
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setPasswordStrength(calculatePasswordStrength(e.target.value));
                }}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </button>
            </div>
            
            {/* Barra de força da senha */}
            {newPassword.length > 0 && (
              <div className="mt-2">
                <Progress value={passwordStrength} className="h-2" />
                <div className="flex justify-between mt-1">
                  <p className="text-xs text-gray-500">
                    Força: <span className={
                      passwordStrength < 30 ? "text-red-500" : 
                      passwordStrength < 70 ? "text-yellow-500" : "text-green-500"
                    }>{getStrengthText(passwordStrength)}</span>
                  </p>
                </div>
              </div>
            )}
            
            <p className="text-xs text-gray-500">
              A senha deve ter no mínimo 6 caracteres. Para maior segurança, inclua letras maiúsculas, 
              minúsculas, números e caracteres especiais.
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          
          <Button type="submit" className="w-full bg-clinic-yellow text-black hover:bg-clinic-yellow/90">
            Atualizar Senha
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PasswordSection;
