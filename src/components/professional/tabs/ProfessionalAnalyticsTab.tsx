
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ChevronDown, FileDown, FileText, Calendar, BarChart3, LineChart, PieChart } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, BarChart, Bar, PieChart as RechartPieChart, Pie, Cell 
} from 'recharts';

const ProfessionalAnalyticsTab = () => {
  const [reportPeriod, setReportPeriod] = useState("weekly");
  
  // Sample data for charts
  const engagementData = [
    { name: 'Seg', posts: 4, reactions: 18, comments: 7 },
    { name: 'Ter', posts: 3, reactions: 12, comments: 5 },
    { name: 'Qua', posts: 5, reactions: 22, comments: 9 },
    { name: 'Qui', posts: 7, reactions: 35, comments: 14 },
    { name: 'Sex', posts: 9, reactions: 42, comments: 21 },
    { name: 'Sáb', posts: 6, reactions: 29, comments: 11 },
    { name: 'Dom', posts: 8, reactions: 31, comments: 9 },
  ];
  
  const completionData = [
    { name: 'Semana 1', taxa: 62 },
    { name: 'Semana 2', taxa: 70 },
    { name: 'Semana 3', taxa: 65 },
    { name: 'Semana 4', taxa: 78 },
  ];
  
  const categoryCompletionData = [
    { name: 'Exercício', value: 75 },
    { name: 'Nutrição', value: 60 },
    { name: 'Bem-estar', value: 85 },
    { name: 'Sono', value: 50 },
  ];
  
  const patientProgressData = [
    { id: 1, name: 'Ana Silva', completionRate: 75, trend: 'up', previousRate: 65 },
    { id: 2, name: 'Carlos Oliveira', completionRate: 60, trend: 'down', previousRate: 68 },
    { id: 3, name: 'Mariana Santos', completionRate: 40, trend: 'up', previousRate: 35 },
    { id: 4, name: 'Bruno Costa', completionRate: 90, trend: 'up', previousRate: 85 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  // Generate insights using NLP-like formatted text
  const generateInsights = () => {
    const insights = [
      "Os pacientes demonstram maior engajamento e adesão às metas de exercícios físicos (75% de conclusão) em comparação com metas nutricionais (60%).",
      "Detectamos um padrão de queda na adesão às metas durante os finais de semana. Considere ajustar a complexidade das metas para esses dias.",
      "Ana Silva e Bruno Costa apresentaram melhoria significativa na taxa de conclusão de metas em relação à semana anterior.",
      "A categoria de bem-estar apresenta a maior taxa de conclusão (85%), indicando boa receptividade dos pacientes a este tipo de meta.",
      "Recomendamos revisão das metas de sono, que apresentam a menor taxa de conclusão (50%) entre todas as categorias."
    ];
    
    return insights;
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Relatórios e Análises</h1>
          <p className="text-muted-foreground">Insights baseados no progresso e engajamento dos seus pacientes</p>
        </div>
        
        <div className="flex gap-2">
          <Tabs defaultValue="weekly" className="w-[320px]" value={reportPeriod} onValueChange={setReportPeriod}>
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="weekly">Semanal</TabsTrigger>
              <TabsTrigger value="monthly">Mensal</TabsTrigger>
              <TabsTrigger value="yearly">Anual</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Button variant="outline" className="flex items-center gap-1">
            <FileDown className="h-4 w-4" />
            <span>Exportar</span>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Engagement Chart */}
        <Card className="col-span-1 md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Engajamento Semanal</CardTitle>
            <Button variant="ghost" size="icon">
              <ChevronDown className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer 
                config={{
                  posts: { label: 'Posts', color: '#6366F1' },
                  reactions: { label: 'Reações', color: '#F59E0B' },
                  comments: { label: 'Comentários', color: '#10B981' }
                }}
              >
                <AreaChart data={engagementData}>
                  <defs>
                    <linearGradient id="colorPosts" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorReactions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorComments" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <ChartTooltipContent payload={payload} />
                        );
                      }
                      return null;
                    }}
                  />
                  <Area type="monotone" dataKey="posts" stroke="#6366F1" fillOpacity={1} fill="url(#colorPosts)" />
                  <Area type="monotone" dataKey="reactions" stroke="#F59E0B" fillOpacity={1} fill="url(#colorReactions)" />
                  <Area type="monotone" dataKey="comments" stroke="#10B981" fillOpacity={1} fill="url(#colorComments)" />
                </AreaChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Completion Rate Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Taxa de Conclusão de Metas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ChartContainer 
                config={{
                  taxa: { label: 'Taxa de Conclusão', color: '#8B5CF6' }
                }}
              >
                <BarChart data={completionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <ChartTooltipContent payload={payload} />
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="taxa" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Category Completion Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Conclusão por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] flex items-center justify-center">
              <ChartContainer 
                config={{
                  value: { label: 'Taxa de Conclusão' }
                }}
              >
                <RechartPieChart>
                  <Pie
                    data={categoryCompletionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {categoryCompletionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip />
                </RechartPieChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Insights Card */}
      <Card>
        <CardHeader className="flex flex-row items-center">
          <FileText className="h-5 w-5 mr-2 text-primary" />
          <CardTitle>Insights e Recomendações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {generateInsights().map((insight, index) => (
              <div key={index} className="flex gap-3 p-3 rounded-md bg-muted/50">
                <div className="mt-0.5 bg-primary/10 text-primary rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0">
                  {index + 1}
                </div>
                <p>{insight}</p>
              </div>
            ))}
            <div className="mt-6">
              <Button 
                variant="default" 
                className="w-full md:w-auto"
                onClick={() => {
                  // In a real implementation, this would open the AI assistant modal
                  // with a pre-filled prompt for deeper analysis
                }}
              >
                Análise Detalhada com IA
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Patient Progress Table */}
      <Card>
        <CardHeader>
          <CardTitle>Progresso dos Pacientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium">Paciente</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Taxa de Conclusão</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Tendência</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {patientProgressData.map((patient) => (
                  <tr key={patient.id} className="border-t">
                    <td className="px-4 py-3 text-sm">{patient.name}</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-full max-w-[100px] bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary rounded-full h-2"
                            style={{ width: `${patient.completionRate}%` }}
                          />
                        </div>
                        <span>{patient.completionRate}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {patient.trend === 'up' ? (
                        <div className="text-green-600 flex items-center">
                          <ArrowUpRight className="h-4 w-4 mr-1" />
                          +{patient.completionRate - patient.previousRate}%
                        </div>
                      ) : (
                        <div className="text-red-600 flex items-center">
                          <ArrowUpRight className="h-4 w-4 mr-1 rotate-180" />
                          {patient.completionRate - patient.previousRate}%
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <Button variant="outline" size="sm">
                        Ver Detalhes
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      {/* Weekly Report Card */}
      <Card>
        <CardHeader className="flex flex-row items-center">
          <Calendar className="h-5 w-5 mr-2 text-primary" />
          <CardTitle>Relatório Semanal Automático</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 border rounded-lg mb-4">
            <h3 className="text-lg font-semibold mb-3">Resumo da Semana</h3>
            <p className="mb-3">
              Esta semana foi marcada por um aumento geral de <strong>8%</strong> na taxa de conclusão 
              de metas dos seus pacientes. Destacaram-se positivamente os pacientes <strong>Ana Silva</strong> e 
              <strong> Bruno Costa</strong>, com taxas de conclusão acima de 75%.
            </p>
            <p className="mb-3">
              Observamos que metas relacionadas a <strong>bem-estar</strong> tiveram a maior taxa de adesão (85%), 
              enquanto metas de <strong>sono</strong> apresentaram menor engajamento (50%).
            </p>
            <h4 className="font-medium mt-4 mb-2">Sugestões para a próxima semana:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Reavalie as metas de sono, possivelmente simplificando-as</li>
              <li>Agende uma sessão de acompanhamento com Mariana Santos, que tem baixa adesão (40%)</li>
              <li>Considere criar metas de grupo focadas em bem-estar, aproveitando o alto engajamento desta categoria</li>
            </ul>
          </div>
          <div className="flex flex-col md:flex-row gap-3">
            <Button className="flex-1">
              <FileDown className="h-4 w-4 mr-2" />
              Baixar Relatório Completo
            </Button>
            <Button variant="outline" className="flex-1">
              Configurar Relatórios Automáticos
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfessionalAnalyticsTab;
