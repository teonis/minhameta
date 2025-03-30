
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trophy, Plus, Settings } from 'lucide-react';
import AchievementCard from '../../social/AchievementCard';
import { Achievement } from '../../social/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type ProfessionalAchievementsTabProps = {
  achievements: Achievement[];
};

const ProfessionalAchievementsTab = ({ achievements }: ProfessionalAchievementsTabProps) => {
  const [showNewAchievementDialog, setShowNewAchievementDialog] = useState(false);

  const handleCreateAchievement = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would create a new achievement
    alert("Conquista criada com sucesso!");
    setShowNewAchievementDialog(false);
  };

  return (
    <div className="space-y-6">
      {/* Achievement management controls */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Conquistas e Medalhas</h3>
        <Dialog open={showNewAchievementDialog} onOpenChange={setShowNewAchievementDialog}>
          <DialogTrigger asChild>
            <Button className="bg-clinic-yellow text-black hover:bg-clinic-yellow/90">
              <Plus className="h-4 w-4 mr-1" /> Nova Conquista
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar Nova Conquista</DialogTitle>
              <DialogDescription>
                Crie uma nova medalha ou conquista para premiar seus pacientes
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateAchievement}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="achievement-name" className="text-sm font-medium">Nome da Conquista</label>
                  <Input id="achievement-name" placeholder="Ex: Primeira Meta Concluída" required />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="achievement-description" className="text-sm font-medium">Descrição</label>
                  <Textarea 
                    id="achievement-description" 
                    placeholder="Descreva a conquista..." 
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="achievement-category" className="text-sm font-medium">Categoria</label>
                  <Input id="achievement-category" placeholder="Ex: Iniciante" required />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="achievement-level" className="text-sm font-medium">Nível</label>
                  <select id="achievement-level" className="w-full border rounded p-2" required>
                    <option value="bronze">Bronze</option>
                    <option value="prata">Prata</option>
                    <option value="ouro">Ouro</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="achievement-image" className="text-sm font-medium">Imagem</label>
                  <Input id="achievement-image" type="file" />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setShowNewAchievementDialog(false)}>Cancelar</Button>
                <Button type="submit" className="bg-clinic-yellow text-black hover:bg-clinic-yellow/90">Criar Conquista</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {achievements.map(achievement => (
          <Card key={achievement.id} className="relative">
            <div className="absolute top-2 right-2 flex gap-2 z-10">
              <Button 
                variant="outline" 
                size="sm" 
                className="h-7 px-2 bg-white/80"
              >
                <Settings className="h-3 w-3 mr-1" /> Editar
              </Button>
            </div>
            <CardContent className="pt-4">
              <AchievementCard achievement={achievement} />
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Button className="bg-clinic-yellow text-black hover:bg-clinic-yellow/90 w-full">
        <Trophy className="h-4 w-4 mr-1" /> Ver Todas as Conquistas
      </Button>
    </div>
  );
};

export default ProfessionalAchievementsTab;
