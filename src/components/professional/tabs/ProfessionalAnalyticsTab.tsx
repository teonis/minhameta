
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProfessionalAnalyticsTab = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Análise de Engajamento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <div className="text-sm text-gray-500">Posts Totais</div>
                <div className="text-2xl font-bold">42</div>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="text-sm text-gray-500">Reações</div>
                <div className="text-2xl font-bold">187</div>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="text-sm text-gray-500">Comentários</div>
                <div className="text-2xl font-bold">76</div>
              </div>
            </div>
            <div className="h-60 border rounded-lg p-4 flex items-center justify-center bg-gray-50">
              <p className="text-gray-500">Gráfico de engajamento seria exibido aqui</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Pacientes Mais Ativos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium">Paciente</th>
                    <th className="px-4 py-2 text-left text-sm font-medium">Posts</th>
                    <th className="px-4 py-2 text-left text-sm font-medium">Interações</th>
                    <th className="px-4 py-2 text-left text-sm font-medium">Último Acesso</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="px-4 py-3 text-sm">João Silva</td>
                    <td className="px-4 py-3 text-sm">12</td>
                    <td className="px-4 py-3 text-sm">47</td>
                    <td className="px-4 py-3 text-sm">Hoje</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-3 text-sm">Maria Oliveira</td>
                    <td className="px-4 py-3 text-sm">8</td>
                    <td className="px-4 py-3 text-sm">36</td>
                    <td className="px-4 py-3 text-sm">Ontem</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-3 text-sm">Carlos Souza</td>
                    <td className="px-4 py-3 text-sm">5</td>
                    <td className="px-4 py-3 text-sm">21</td>
                    <td className="px-4 py-3 text-sm">3 dias atrás</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfessionalAnalyticsTab;
