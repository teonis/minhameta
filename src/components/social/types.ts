
// Define explicit types for reuse across components
export type Visibility = "public" | "friends" | "private";
export type Level = "bronze" | "prata" | "ouro";

export type Post = {
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

export type Group = {
  id: number;
  name: string;
  description: string;
  coverImage: string;
  memberCount: number;
  professionalId: number;
  professionalName: string;
};

export type Challenge = {
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

export type Achievement = {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
  level: Level;
  unlockedAt: string;
};

// Mock data for use across components
export const mockPosts: Post[] = [
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

export const mockGroups: Group[] = [
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

export const mockChallenges: Challenge[] = [
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

export const mockAchievements: Achievement[] = [
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
