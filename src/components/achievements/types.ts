
export type AchievementLevel = 'bronze' | 'prata' | 'ouro' | 'diamante';

export type AchievementCategory = 
  | 'progresso'
  | 'consistência'
  | 'metas'
  | 'comunidade'
  | 'surpresa';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  level: AchievementLevel;
  category: AchievementCategory;
  image: string;
  unlockedAt?: string; // Data em que foi desbloqueada, se nulo significa que está bloqueada
  isHidden?: boolean; // Se é uma conquista surpresa não revelada
  requirement?: string; // Descrição de como desbloquear
  points: number; // Pontos que dá ao ser desbloqueada
}
