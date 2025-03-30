
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Users, MessageSquare, Award, Heart, Plus, Settings,
  ThumbsUp, Trophy, Target, Send, Lock, Globe, UserPlus
} from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import SocialPostCard from '../social/SocialPostCard';
import ChallengeCard from '../social/ChallengeCard';
import GroupCard from '../social/GroupCard';
import AchievementCard from '../social/AchievementCard';

import { 
  mockPosts, 
  mockGroups, 
  mockChallenges, 
  mockAchievements,
  type Post,
  type Group,
  type Challenge,
  type Achievement,
  type Visibility
} from '../social/ComunidadeMeta';

const ProfessionalComunidadeMeta = () => {
  const [newPostContent, setNewPostContent] = useState('');
  const [postVisibility, setPostVisibility] = useState<Visibility>('public');
  const [showNewGroupDialog, setShowNewGroupDialog] = useState(false);
  const [showNewChallengeDialog, setShowNewChallengeDialog] = useState(false);
  const [showNewAchievementDialog, setShowNewAchievementDialog] = useState(false);
  
  // Track filter and moderation settings
  const [showHiddenPosts, setShowHiddenPosts] = useState(false);
  const [selectedPatientFilter, setSelectedPatientFilter] = useState<number | null>(null);
  const [selectedGroupFilter, setSelectedGroupFilter] = useState<number | null>(null);

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;
    
    // In a real app, this would send the data to Supabase
    alert(`Post criado com visibilidade: ${postVisibility}`);
    setNewPostContent('');
  };

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would create a new group
    alert("Grupo criado com sucesso!");
    setShowNewGroupDialog(false);
  };

  const handleCreateChallenge = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would create a new challenge
    alert("Desafio criado com sucesso!");
    setShowNewChallengeDialog(false);
  };

  const handleCreateAchievement = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would create a new achievement
    alert("Conquista criada com sucesso!");
    setShowNewAchievementDialog(false);
  };

  const handleModeratePost = (postId: number) => {
    // In a real app, this would open a moderation dialog
    alert(`Moderando post ${postId}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6 text-clinic-yellow" />
          <h2 className="text-xl font-bold">Comunidade Meta</h2>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-gray-100">Beta</Badge>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Settings className="h-4 w-4" /> Configurações
          </Button>
        </div>
      </div>

      <Tabs defaultValue="feed" className="w-full">
        <TabsList className="mb-4 w-full justify-start">
          <TabsTrigger value="feed" className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" /> Feed
          </TabsTrigger>
          <TabsTrigger value="groups" className="flex items-center gap-1">
            <Users className="h-4 w-4" /> Grupos
          </TabsTrigger>
          <TabsTrigger value="challenges" className="flex items-center gap-1">
            <Target className="h-4 w-4" /> Desafios
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex items-center gap-1">
            <Award className="h-4 w-4" /> Conquistas
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-1">
            <Trophy className="h-4 w-4" /> Análises
          </TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="space-y-4">
          {/* Moderation Controls */}
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm font-medium">Filtros e Moderação</CardTitle>
            </CardHeader>
            <CardContent className="py-2">
              <div className="flex flex-wrap gap-3 items-center">
                <div className="flex items-center gap-2">
                  <label htmlFor="patient-filter" className="text-sm">Paciente:</label>
                  <select 
                    id="patient-filter" 
                    className="text-sm border rounded p-1"
                    onChange={(e) => setSelectedPatientFilter(Number(e.target.value) || null)}
                  >
                    <option value="">Todos</option>
                    <option value="101">João Silva</option>
                    <option value="102">Maria Oliveira</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor="group-filter" className="text-sm">Grupo:</label>
                  <select 
                    id="group-filter" 
                    className="text-sm border rounded p-1"
                    onChange={(e) => setSelectedGroupFilter(Number(e.target.value) || null)}
                  >
                    <option value="">Todos</option>
                    <option value="1">Saúde Mental</option>
                    <option value="2">Atividade Física</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm cursor-pointer flex items-center gap-1">
                    <input 
                      type="checkbox" 
                      checked={showHiddenPosts} 
                      onChange={() => setShowHiddenPosts(!showHiddenPosts)}
                    />
                    Mostrar posts ocultos
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Create new post */}
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handlePostSubmit}>
                <div className="flex gap-3 mb-3">
                  <Avatar>
                    <AvatarFallback className="bg-clinic-yellow text-black">DR</AvatarFallback>
                  </Avatar>
                  <Textarea 
                    placeholder="Compartilhe uma atualização ou motivação com os pacientes..." 
                    className="flex-1"
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      type="button"
                      onClick={() => setPostVisibility('public')}
                      className={postVisibility === 'public' ? 'border-clinic-yellow text-clinic-yellow' : ''}
                    >
                      <Globe className="h-4 w-4 mr-1" /> Todos os Pacientes
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      type="button"
                      onClick={() => setPostVisibility('friends')}
                      className={postVisibility === 'friends' ? 'border-clinic-yellow text-clinic-yellow' : ''}
                    >
                      <UserPlus className="h-4 w-4 mr-1" /> Grupo Específico
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      type="button"
                      onClick={() => setPostVisibility('private')}
                      className={postVisibility === 'private' ? 'border-clinic-yellow text-clinic-yellow' : ''}
                    >
                      <Lock className="h-4 w-4 mr-1" /> Paciente Específico
                    </Button>
                  </div>
                  <Button type="submit" className="bg-clinic-yellow text-black hover:bg-clinic-yellow/90">
                    <Send className="h-4 w-4 mr-1" /> Publicar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Posts feed with moderation controls */}
          {mockPosts.map(post => (
            <Card key={post.id} className="relative">
              <div className="absolute top-2 right-2 flex gap-2 z-10">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-7 px-2 bg-white"
                  onClick={() => handleModeratePost(post.id)}
                >
                  <Settings className="h-3 w-3 mr-1" /> Moderar
                </Button>
              </div>
              <CardContent className="pt-4">
                <SocialPostCard post={post} />
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="groups" className="space-y-6">
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
            {mockGroups.map(group => (
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
        </TabsContent>

        <TabsContent value="challenges" className="space-y-6">
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
                        {mockGroups.map(group => (
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
            {mockChallenges.map(challenge => (
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
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
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
            {mockAchievements.map(achievement => (
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
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfessionalComunidadeMeta;
