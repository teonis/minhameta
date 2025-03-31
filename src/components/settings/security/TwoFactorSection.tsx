
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Shield } from 'lucide-react';

const TwoFactorSection = () => {
  const [mfaEnabled, setMfaEnabled] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Shield className="h-5 w-5 text-clinic-yellow" />
          Autenticação de Dois Fatores
        </CardTitle>
        <CardDescription>
          Adicione uma camada extra de segurança à sua conta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="mfa">Ativar autenticação de dois fatores</Label>
            <p className="text-sm text-gray-500">
              Receba um código por SMS ou use um aplicativo autenticador
            </p>
          </div>
          <Switch
            id="mfa"
            checked={mfaEnabled}
            onCheckedChange={setMfaEnabled}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TwoFactorSection;
