
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Users, Plus, Settings } from 'lucide-react';
import GroupCard from '../../social/GroupCard';
import { Group } from '../../social/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type ProfessionalGroupsTabProps = {
  groups: Group[];
};

const ProfessionalGroupsTab = ({ groups }: ProfessionalGroupsTabProps) => {
  const [showNewGroupDialog, setShowNewGroupDialog] = useState(false);

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would create a new group
    alert("Grupo criado com sucesso!");
    setShowNewGroupDialog(false);
  };

  return (
    <div className="space-y-6">
      {/* Group management controls */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Grupos de Apoio e Temáticos</h3>
        <Dialog open={showNewGroupDialog} onOpenChange={setShowNewGroupDialog}>
          <DialogTrigger asChild>
            <Button className="bg-clinic-yellow text-black hover:bg-clinic-yellow/90">
              <Plus className="h-4 w-4 mr-1" /> Novo Grupo
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar Novo Grupo</DialogTitle>
              <DialogDescription>
                Crie um novo grupo temático para seus pacientes
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateGroup}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="group-name" className="text-sm font-medium">Nome do Grupo</label>
                  <Input id="group-name" placeholder="Ex: Saúde Mental" required />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="group-description" className="text-sm font-medium">Descrição</label>
                  <Textarea 
                    id="group-description" 
                    placeholder="Descreva o propósito deste grupo..." 
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="group-image" className="text-sm font-medium">Imagem de Capa</label>
                  <Input id="group-image" type="file" />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setShowNewGroupDialog(false)}>Cancelar</Button>
                <Button type="submit" className="bg-clinic-yellow text-black hover:bg-clinic-yellow/90">Criar Grupo</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {groups.map(group => (
          <Card key={group.id} className="relative">
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
              <GroupCard group={group} />
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Button className="bg-clinic-yellow text-black hover:bg-clinic-yellow/90 w-full">
        <Users className="h-4 w-4 mr-1" /> Ver Todos os Grupos
      </Button>
    </div>
  );
};

export default ProfessionalGroupsTab;
