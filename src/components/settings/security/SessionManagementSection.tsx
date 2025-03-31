
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { LogOut } from 'lucide-react';

const SessionManagementSection = () => {
  const { logoutAllSessions } = useAuth();

  const handleLogoutAllSessions = async () => {
    try {
      await logoutAllSessions();
      toast.success("Todas as sessões foram encerradas com sucesso");
    } catch (error) {
      toast.error("Erro ao encerrar sessões. Tente novamente.");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <LogOut className="h-5 w-5 text-clinic-yellow" />
          Gerenciamento de Sessões
        </CardTitle>
        <CardDescription>
          Gerencie suas sessões ativas em diferentes dispositivos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Encerre todas as suas sessões ativas, exceto a atual. Útil se você
            suspeita que sua conta foi acessada em dispositivos não autorizados.
          </p>
          <Button 
            variant="destructive" 
            onClick={handleLogoutAllSessions}
          >
            Encerrar todas as sessões
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SessionManagementSection;
