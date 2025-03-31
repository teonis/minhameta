
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
import { LogOut, Trash2 } from 'lucide-react';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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

  const handleClearAllData = () => {
    try {
      // Limpar todos os dados do localStorage
      localStorage.clear();
      
      // Limpar outros armazenamentos se necessário
      sessionStorage.clear();
      
      // Limpar todos os cookies
      document.cookie.split(";").forEach(function(c) {
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
      
      toast.success("Todos os dados foram limpos com sucesso. A página será recarregada.");
      
      // Recarregar a página para aplicar as mudanças
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    } catch (error) {
      toast.error("Erro ao limpar os dados. Tente novamente.");
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

          <div className="border-t pt-4 mt-6">
            <p className="text-sm text-gray-500 mb-4">
              Reiniciar o sistema limpará todos os dados, logins, publicações e informações armazenadas.
              Esta ação não pode ser desfeita.
            </p>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="destructive" 
                  className="flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" /> Reiniciar o sistema
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta ação irá apagar permanentemente todos os dados do sistema, incluindo logins, publicações e configurações.
                    O sistema será reiniciado do zero. Esta ação não pode ser desfeita.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleClearAllData}>
                    Sim, reiniciar o sistema
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SessionManagementSection;
