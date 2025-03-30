
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Target, Plus, Settings } from 'lucide-react';
import ChallengeCard from '../../social/ChallengeCard';
import { Challenge, Group } from '../../social/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type ProfessionalChallengesTabProps = {
  challenges: Challenge[];
  groups: Group[];
};

const ProfessionalChallengesTab = ({ challenges, groups }: ProfessionalChallengesTabProps) => {
  const [showNewChallengeDialog, setShowNewChallengeDialog] = useState(false);

  const handleCreateChallenge = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would create a new challenge
    alert("Desafio criado com sucesso!");
    setShowNewChallengeDialog(false);
  };

  return (
    <div className="space-y-6">
      {/* Challenge management controls */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Desafios Coletivos</h3>
        <Dialog open={showNewChallengeDialog} onOpenChange={setShowNewChallengeDialog}>
          <DialogTrigger asChild>
            <Button className="bg-clinic-yellow text-black hover:bg-clinic-yellow/90">
              <Plus className="h-4 w-4 mr-1" /> Novo Desafio
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar Novo Desafio</DialogTitle>
              <DialogDescription>
                Crie um novo desafio coletivo para motivar seus pacientes
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateChallenge}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="challenge-title" className="text-sm font-medium">Título do Desafio</label>
                  <Input id="challenge-title" placeholder="Ex: 21 Dias de Meditação" required />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="challenge-description" className="text-sm font-medium">Descrição</label>
                  <Textarea 
                    id="challenge-description" 
                    placeholder="Descreva o desafio..." 
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="challenge-start" className="text-sm font-medium">Data de Início</label>
                    <Input id="challenge-start" type="date" required />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="challenge-end" className="text-sm font-medium">Data de Término</label>
                    <Input id="challenge-end" type="date" required />
                  </div>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="challenge-group" className="text-sm font-medium">Grupo</label>
                  <select id="challenge-group" className="w-full border rounded p-2">
                    <option value="">Selecione um grupo</option>
                    {groups.map(group => (
                      <option key={group.id} value={group.id}>{group.name}</option>
                    ))}
                  </select>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="challenge-goal" className="text-sm font-medium">Meta Coletiva</label>
                  <Input id="challenge-goal" type="number" placeholder="Ex: 500" required />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setShowNewChallengeDialog(false)}>Cancelar</Button>
                <Button type="submit" className="bg-clinic-yellow text-black hover:bg-clinic-yellow/90">Criar Desafio</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {challenges.map(challenge => (
          <Card key={challenge.id} className="relative">
            <div className="absolute top-2 right-2 flex gap-2 z-10">
              <Button 
                variant="outline" 
                size="sm" 
                className="h-7 px-2 bg-white/80"
              >
                <Settings className="h-3 w-3 mr-1" /> Gerenciar
              </Button>
            </div>
            <CardContent className="pt-4">
              <ChallengeCard challenge={challenge} />
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Button className="bg-clinic-yellow text-black hover:bg-clinic-yellow/90 w-full">
        <Target className="h-4 w-4 mr-1" /> Ver Todos os Desafios
      </Button>
    </div>
  );
};

export default ProfessionalChallengesTab;
