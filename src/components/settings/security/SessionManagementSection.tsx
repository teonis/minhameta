
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Shield, LogOut, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const SessionManagementSection = () => {
  const { logoutAllSessions, isLoading } = useAuth();
  const [sessionNotifications, setSessionNotifications] = useState(true);
  const [confirmingLogoutAll, setConfirmingLogoutAll] = useState(false);

  const handleLogoutAllSessions = async () => {
    try {
      await logoutAllSessions();
      setConfirmingLogoutAll(false);
    } catch (error) {
      toast.error("Erro ao encerrar todas as sessões");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Shield className="h-5 w-5 text-clinic-yellow" />
          Gerenciamento de Sessões
        </CardTitle>
        <CardDescription>
          Gerencie os dispositivos conectados à sua conta
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="session-notifications">Notificações de novos logins</Label>
            <p className="text-sm text-gray-500">
              Receba alertas quando sua conta for acessada de um novo dispositivo
            </p>
          </div>
          <Switch
            id="session-notifications"
            checked={sessionNotifications}
            onCheckedChange={setSessionNotifications}
          />
        </div>
        
        <Dialog open={confirmingLogoutAll} onOpenChange={setConfirmingLogoutAll}>
          <DialogTrigger asChild>
            <Button 
              variant="destructive" 
              className="w-full flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Encerrar todas as sessões
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Encerrar todas as sessões
              </DialogTitle>
              <DialogDescription>
                Esta ação vai desconectar todos os dispositivos conectados à sua conta. 
                Você precisará fazer login novamente em todos eles.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setConfirmingLogoutAll(false)}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleLogoutAllSessions}
                disabled={isLoading}
                className="flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    Processando...
                  </>
                ) : (
                  <>
                    <LogOut className="h-4 w-4" />
                    Confirmar
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default SessionManagementSection;
