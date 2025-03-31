
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Shield } from 'lucide-react';
import PasswordForm from './password/PasswordForm';

const PasswordSection = () => {
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
        <PasswordForm />
      </CardContent>
    </Card>
  );
};

export default PasswordSection;
