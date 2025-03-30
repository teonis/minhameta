
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoaderCircle, Sparkles, Send, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type PatientGoal = {
  id: number;
  title: string;
  description: string;
  status: string;
  dueDate: string;
  priority: string;
};

type AIAssistantModalProps = {
  isOpen: boolean;
  onClose: () => void;
  patientId?: number;
  patientName?: string;
  patientGoals?: PatientGoal[];
};

const AIAssistantModal = ({ isOpen, onClose, patientId, patientName, patientGoals }: AIAssistantModalProps) => {
  const [activeTab, setActiveTab] = useState("goalAdjustment");
  const [userPrompt, setUserPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");

  const handleSendPrompt = () => {
    if (!userPrompt.trim()) return;
    
    setIsLoading(true);
    
    // In a real implementation, this would make an API call to OpenAI
    // For demo purposes, we'll simulate a response after a delay
    setTimeout(() => {
      const simulatedResponses = {
        goalAdjustment: `Baseado na análise das metas atuais de ${patientName}, sugiro os seguintes ajustes:
        
1. Para a meta "Exercícios de Respiração": Considere aumentar gradualmente o tempo de 10 para 15 minutos, pois o paciente tem demonstrado consistência.

2. Para "Caminhada diária": O paciente parece ter dificuldade em completar 20 minutos diários. Talvez seja melhor reduzir para 15 minutos inicialmente e depois aumentar.

A análise do padrão de conclusão indica que o paciente tem maior adesão em atividades matinais. Recomendo programar as metas para o período da manhã quando possível.`,
        
        adherencePrediction: `ALERTA: Detectei um possível padrão de queda de engajamento para ${patientName}.
        
Nos últimos 14 dias, houve uma redução de 30% na frequência de check-ins e o tempo de resposta aumentou em média 8 horas.

Recomendo:
- Agendar uma sessão de acompanhamento
- Simplificar temporariamente as metas atuais
- Considerar introduzir um elemento de gamificação para reestimular o engajamento`,
        
        reportGeneration: `# Relatório Semanal: ${patientName}
        
## Resumo de Progresso
- Completou 3 de 5 metas esta semana (60% de conclusão)
- Melhoria de 15% em relação à semana anterior
- Padrão consistente em metas relacionadas a exercícios físicos

## Áreas de Atenção
- Dificuldade persistente com metas de nutrição
- Baixo engajamento nos finais de semana

## Recomendações
- Explorar motivações subjacentes para resistência às metas nutricionais
- Considerar ajustar expectativas para os finais de semana
- Introduzir micro-metas para facilitar o progresso em áreas desafiadoras`,
        
        goalSuggestions: `Com base no perfil de ${patientName}, sugiro as seguintes metas complementares:

1. **Meditação Guiada** - 5 minutos diários
   Complementa bem os exercícios de respiração já em andamento, ajudando a reduzir ansiedade.

2. **Diário de Gratidão** - 3 itens por dia
   Reforça o estado mental positivo e cria um hábito de reflexão.

3. **Hidratação Consciente** - 2L de água por dia
   Meta de nutrição básica que pode servir como porta de entrada para hábitos alimentares mais saudáveis.

4. **Pausas Ativas** - 2 pausas de 5 minutos por dia
   Complementa a meta de exercícios, integra movimento no dia-a-dia.`
      };
      
      setAiResponse(simulatedResponses[activeTab as keyof typeof simulatedResponses] || "");
      setIsLoading(false);
    }, 2000);
  };

  const handleRefresh = () => {
    setUserPrompt("");
    setAiResponse("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-clinic-yellow" />
            Assistente IA
            {patientName && <span className="ml-2 text-sm font-normal text-gray-500">- {patientName}</span>}
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="goalAdjustment" className="flex-1">Ajuste de Metas</TabsTrigger>
            <TabsTrigger value="adherencePrediction" className="flex-1">Previsão de Adesão</TabsTrigger>
            <TabsTrigger value="reportGeneration" className="flex-1">Relatório</TabsTrigger>
            <TabsTrigger value="goalSuggestions" className="flex-1">Sugestões</TabsTrigger>
          </TabsList>

          {patientGoals && patientGoals.length > 0 && (
            <div className="my-4 p-4 bg-gray-50 rounded-md">
              <h3 className="text-sm font-medium mb-2">Metas Atuais:</h3>
              <div className="space-y-2">
                {patientGoals.map((goal) => (
                  <div key={goal.id} className="text-sm">
                    • <span className="font-medium">{goal.title}</span> - {goal.status}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-4">
            <div className="space-y-4">
              <div>
                <div className="flex">
                  <Textarea 
                    placeholder={`Faça uma pergunta sobre ${activeTab === 'goalAdjustment' ? 'ajustes nas metas' : 
                                                            activeTab === 'adherencePrediction' ? 'previsão de adesão' : 
                                                            activeTab === 'reportGeneration' ? 'geração de relatório' : 
                                                            'sugestões de metas'} para ${patientName || 'o paciente'}`}
                    value={userPrompt}
                    onChange={(e) => setUserPrompt(e.target.value)}
                    className="min-h-[100px] flex-1"
                  />
                </div>
                <div className="flex justify-end mt-2 space-x-2">
                  <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Limpar
                  </Button>
                  <Button onClick={handleSendPrompt} disabled={isLoading || !userPrompt.trim()}>
                    {isLoading ? (
                      <>
                        <LoaderCircle className="h-4 w-4 mr-2 animate-spin" />
                        Gerando...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Enviar
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {aiResponse && (
                <Card className="mt-4">
                  <CardContent className="pt-6">
                    <div className="whitespace-pre-line">{aiResponse}</div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Fechar</Button>
          {aiResponse && (
            <Button>
              Aplicar Sugestões
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AIAssistantModal;
