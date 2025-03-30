
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Users, MessageSquare, Award, Heart, Lightbulb, 
  ThumbsUp, Trophy, Target, Send, Lock, Globe, UserPlus
} from 'lucide-react';
import SocialPostCard from './SocialPostCard';
import ChallengeCard from './ChallengeCard';
import GroupCard from './GroupCard';
import AchievementCard from './AchievementCard';

// Define explicit types to fix the TypeScript errors
type Visibility = "public" | "friends" | "private";
type Level = "bronze" | "prata" | "ouro";

type Post = {
  id: number;
  userId: number;
  userName: string;
  userInitials: string;
  userAvatar: string | null;
  content: string;
  image: string | null;
  visibility: Visibility;
  createdAt: string;
  reactions: { thumbsUp: number; heart: number; clap: number; };
  comments: { id: number; userId: number; userName: string; content: string; }[];
};

type Group = {
  id: number;
  name: string;
  description: string;
  coverImage: string;
  memberCount: number;
  professionalId: number;
  professionalName: string;
};

type Challenge = {
  id: number;
  title: string;
  description: string;
  groupId: number;
  groupName: string;
  professionalId: number;
  professionalName: string;
  startDate: string;
  endDate: string;
  collectiveGoal: number;
  currentProgress: number;
  participants: number;
};

type Achievement = {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
  level: Level;
  unlockedAt: string;
};

// Simulated data - In a real app, this would come from Supabase
const mockPosts: Post[] = [
  {
    id: 1,
    userId: 101,
    userName: "João Silva",
    userInitials: "JS",
    userAvatar: null,
    content: "Consegui concluir minha meta de exercícios por 7 dias consecutivos! 🏃‍♂️",
    image: null,
    visibility: "public",
    createdAt: "2023-11-15T14:30:00Z",
    reactions: { thumbsUp: 12, heart: 5, clap: 8 },
    comments: [
      { id: 1, userId: 102, userName: "Maria Oliveira", content: "Incrível, João! Continue assim!" },
      { id: 2, userId: 103, userName: "Dr. Tay Rocha", content: "Excelente progresso, vamos manter esse ritmo!" }
    ]
  },
  {
    id: 2,
    userId: 102,
    userName: "Maria Oliveira",
    userInitials: "MO",
    userAvatar: null,
    content: "Minha primeira semana seguindo a dieta recomendada pela Dra. Tay. Já estou sentindo mais disposição!",
    image: "/lovable-uploads/a1f879b6-4b31-4396-b00a-e5df795d515f.png",
    visibility: "friends",
    createdAt: "2023-11-14T10:15:00Z",
    reactions: { thumbsUp: 8, heart: 10, clap: 3 },
    comments: []
  }
];

const mockGroups: Group[] = [
  {
    id: 1,
    name: "Saúde Mental",
    description: "Grupo para compartilhar práticas e progressos relacionados à saúde mental",
    coverImage: "/lovable-uploads/ca75c121-8b4f-4686-a93e-f1ce6ce199c2.jpg",
    memberCount: 24,
    professionalId: 201,
    professionalName: "Dr. Teonis Rocha"
  },
  {
    id: 2,
    name: "Atividade Física",
    description: "Compartilhe seus exercícios e motivação para se manter ativo",
    coverImage: "/lovable-uploads/b31f6405-fca3-414f-afab-1a5e8a746dd6.jpg",
    memberCount: 18,
    professionalId: 202,
    professionalName: "Dra. Tay Rocha"
  }
];

const mockChallenges: Challenge[] = [
  {
    id: 1,
    title: "21 Dias de Meditação",
    description: "Complete 10 minutos de meditação por dia durante 21 dias consecutivos",
    groupId: 1,
    groupName: "Saúde Mental",
    professionalId: 201,
    professionalName: "Dr. Teonis Rocha",
    startDate: "2023-11-10",
    endDate: "2023-12-01",
    collectiveGoal: 500,
    currentProgress: 320,
    participants: 15
  },
  {
    id: 2,
    title: "Desafio Hidratação",
    description: "Beba pelo menos 2L de água por dia durante uma semana",
    groupId: 2,
    groupName: "Hábitos Saudáveis",
    professionalId: 202,
    professionalName: "Dra. Tay Rocha",
    startDate: "2023-11-15",
    endDate: "2023-11-22",
    collectiveGoal: 100,
    currentProgress: 65,
    participants: 10
  }
];

const mockAchievements: Achievement[] = [
  {
    id: 1,
    name: "Primeira Meta Concluída",
    description: "Parabéns por completar sua primeira meta!",
    image: "/lovable-uploads/643359a4-2048-486f-a9b1-023915bdd3a7.png", 
    category: "Iniciante",
    level: "bronze",
    unlockedAt: "2023-10-10"
  },
  {
    id: 2,
    name: "Motivador da Comunidade",
    description: "Você reagiu positivamente a 10 conquistas de outros usuários",
    image: "/lovable-uploads/8e2aa498-0d65-4ede-805c-f77f7bdc4e89.png",
    category: "Social",
    level: "prata",
    unlockedAt: "2023-11-01"
  },
  {
    id: 3,
    name: "7 Dias Perfeitos",
    description: "Você completou todas as suas metas por 7 dias consecutivos",
    image: "/lovable-uploads/9074461e-2771-48a6-9b29-9664cb301ad9.png",
    category: "Consistência",
    level: "ouro",
    unlockedAt: "2023-11-12"
  }
];

// Export the type definitions for use in other components
export type { Post, Group, Challenge, Achievement, Visibility, Level };

// Export the mock data for use in other components
export { mockPosts, mockGroups, mockChallenges, mockAchievements };

const ComunidadeMeta = () => {
  const [newPostContent, setNewPostContent] = useState('');
  const [postVisibility, setPostVisibility] = useState<Visibility>('public');

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;
    
    // In a real app, this would send the data to Supabase
    alert(`Post criado com visibilidade: ${postVisibility}`);
    setNewPostContent('');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6 text-clinic-yellow" />
          <h2 className="text-xl font-bold">Comunidade Meta</h2>
        </div>
        <Badge variant="outline" className="bg-gray-100">Beta</Badge>
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
        </TabsList>

        <TabsContent value="feed" className="space-y-4">
          {/* Create new post */}
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handlePostSubmit}>
                <div className="flex gap-3 mb-3">
                  <Avatar>
                    <AvatarFallback className="bg-clinic-yellow text-black">MS</AvatarFallback>
                  </Avatar>
                  <Textarea 
                    placeholder="Compartilhe uma conquista ou progresso..." 
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
                      <Globe className="h-4 w-4 mr-1" /> Público
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      type="button"
                      onClick={() => setPostVisibility('friends')}
                      className={postVisibility === 'friends' ? 'border-clinic-yellow text-clinic-yellow' : ''}
                    >
                      <UserPlus className="h-4 w-4 mr-1" /> Amigos
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      type="button"
                      onClick={() => setPostVisibility('private')}
                      className={postVisibility === 'private' ? 'border-clinic-yellow text-clinic-yellow' : ''}
                    >
                      <Lock className="h-4 w-4 mr-1" /> Privado
                    </Button>
                  </div>
                  <Button type="submit" className="bg-clinic-yellow text-black hover:bg-clinic-yellow/90">
                    <Send className="h-4 w-4 mr-1" /> Publicar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Posts feed */}
          {mockPosts.map(post => (
            <SocialPostCard key={post.id} post={post} />
          ))}
        </TabsContent>

        <TabsContent value="groups" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockGroups.map(group => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>
          <Button className="bg-clinic-yellow text-black hover:bg-clinic-yellow/90 w-full">
            <Users className="h-4 w-4 mr-1" /> Ver Todos os Grupos
          </Button>
        </TabsContent>

        <TabsContent value="challenges" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockChallenges.map(challenge => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
          <Button className="bg-clinic-yellow text-black hover:bg-clinic-yellow/90 w-full">
            <Target className="h-4 w-4 mr-1" /> Ver Todos os Desafios
          </Button>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockAchievements.map(achievement => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
          <Button className="bg-clinic-yellow text-black hover:bg-clinic-yellow/90 w-full">
            <Trophy className="h-4 w-4 mr-1" /> Ver Todas as Conquistas
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComunidadeMeta;
