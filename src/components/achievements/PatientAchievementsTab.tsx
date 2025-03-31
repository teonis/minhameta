import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Achievement, AchievementLevel } from './types';
import AchievementGallery from './AchievementGallery';
import AchievementUnlockedModal from './AchievementUnlockedModal';

const mockAchievements: Achievement[] = [
  {
    id: '1',
    name: 'Primeira Meta',
    description: 'Completou sua primeira meta com sucesso',
    level: 'bronze',
    category: 'metas',
    image: '/lovable-uploads/a1f879b6-4b31-4396-b00a-e5df795d515f.png',
    unlockedAt: '2023-10-15T10:30:00',
    points: 10
  },
  {
    id: '2',
    name: 'Consistência Semanal',
    description: 'Completou atividades por 7 dias consecutivos',
    level: 'prata',
    category: 'consistência',
    image: '/lovable-uploads/9074461e-2771-48a6-9b29-9664cb301ad9.png',
    unlockedAt: '2023-11-10T14:20:00',
    points: 25
  },
  {
    id: '3',
    name: 'Meta Difícil',
    description: 'Completou uma meta de alta prioridade',
    level: 'ouro',
    category: 'metas',
    image: '/lovable-uploads/8e2aa498-0d65-4ede-805c-f77f7bdc4e89.png',
    unlockedAt: '2023-12-05T09:15:00',
    points: 50
  },
  {
    id: '4',
    name: 'Diário Detalhado',
    description: 'Escreveu 10 entradas detalhadas em seu diário',
    level: 'bronze',
    category: 'progresso',
    image: '/lovable-uploads/643359a4-2048-486f-a9b1-023915bdd3a7.png',
    unlockedAt: '2023-12-20T16:45:00',
    points: 15
  },
  {
    id: '5',
    name: 'Mestre da Recuperação',
    description: 'Completou todas as metas de um programa de recuperação',
    level: 'diamante',
    category: 'progresso',
    image: '/lovable-uploads/eb79d86c-bf67-47ab-bb48-6aa1677247f9.png',
    points: 100
  },
  {
    id: '6',
    name: 'Amigo da Comunidade',
    description: 'Participou ativamente da comunidade por 30 dias',
    level: 'prata',
    category: 'comunidade',
    image: '/lovable-uploads/ea6fe89d-d561-4292-a9f4-ae46d5cd7cde.png',
    points: 30
  },
  {
    id: '7',
    name: 'Superação',
    description: 'Conquistou várias metas em um curto período de tempo',
    level: 'ouro',
    category: 'progresso',
    image: '/lovable-uploads/ca75c121-8b4f-4686-a93e-f1ce6ce199c2.jpg',
    points: 45
  },
  {
    id: '8',
    name: 'Conquista Surpresa',
    description: 'Descoberta por uma ação inesperada',
    level: 'bronze',
    category: 'surpresa',
    image: '/lovable-uploads/b31f6405-fca3-414f-afab-1a5e8a746dd6.jpg',
    isHidden: true,
    points: 20
  }
];

interface PatientAchievementsTabProps {
  patientId?: number;
}

const PatientAchievementsTab = ({ patientId }: PatientAchievementsTabProps) => {
  const [achievements, setAchievements] = useState<Achievement[]>(mockAchievements);
  const [showAll, setShowAll] = useState(false);
  const [unlockedAchievement, setUnlockedAchievement] = useState<Achievement | null>(null);
  
  const unlockRandomAchievement = () => {
    const lockedAchievements = achievements.filter(a => !a.unlockedAt && !a.isHidden);
    if (lockedAchievements.length > 0) {
      const randomIndex = Math.floor(Math.random() * lockedAchievements.length);
      const achievementToUnlock = lockedAchievements[randomIndex];
      
      const updatedAchievements = achievements.map(a => {
        if (a.id === achievementToUnlock.id) {
          return { 
            ...a, 
            unlockedAt: new Date().toISOString() 
          };
        }
        return a;
      });
      
      setAchievements(updatedAchievements);
      setUnlockedAchievement({ ...achievementToUnlock, unlockedAt: new Date().toISOString() });
    }
  };
  
  useEffect(() => {
    const timer = setTimeout(() => {
      const unlockedAchievements = achievements.filter(a => a.unlockedAt);
      if (unlockedAchievements.length > 0) {
        const randomIndex = Math.floor(Math.random() * unlockedAchievements.length);
        setUnlockedAchievement(unlockedAchievements[randomIndex]);
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const recentlyUnlocked = achievements
    .filter(a => a.unlockedAt)
    .sort((a, b) => new Date(b.unlockedAt!).getTime() - new Date(a.unlockedAt!).getTime())
    .slice(0, 4);
  
  const nextToUnlock = achievements
    .filter(a => !a.unlockedAt && !a.isHidden)
    .slice(0, 3);
  
  return (
    <div className="space-y-6">
      {!showAll ? (
        <div>
          <div className="bg-white rounded-lg shadow p-4 md:p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-clinic-yellow" />
                Minhas Conquistas
              </h2>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowAll(true)}
              >
                Ver Todas
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-r from-yellow-50 to-white p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-600 mb-1">Total de Conquistas</h3>
                <div className="flex items-end">
                  <span className="text-2xl font-bold">{achievements.filter(a => a.unlockedAt).length}</span>
                  <span className="text-sm text-gray-500 ml-1">/ {achievements.length}</span>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-yellow-50 to-white p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-600 mb-1">Pontos Acumulados</h3>
                <div className="flex items-end">
                  <span className="text-2xl font-bold">
                    {achievements
                      .filter(a => a.unlockedAt)
                      .reduce((sum, a) => sum + a.points, 0)
                    }
                  </span>
                  <span className="text-sm text-gray-500 ml-1">pts</span>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-yellow-50 to-white p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-600 mb-1">Maior Nível</h3>
                <div className="flex items-center">
                  <Award className="h-5 w-5 mr-1 text-clinic-yellow" />
                  <span className="text-xl font-bold capitalize">
                    {(() => {
                      const levels = ['bronze', 'prata', 'ouro', 'diamante'] as AchievementLevel[];
                      
                      for (let i = levels.length - 1; i >= 0; i--) {
                        const hasLevel = achievements
                          .filter(a => a.unlockedAt)
                          .some(a => a.level === levels[i]);
                        
                        if (hasLevel) return levels[i];
                      }
                      
                      return 'Nenhum';
                    })()}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3">Conquistas Recentes</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {recentlyUnlocked.map(achievement => (
                  <motion.div 
                    key={achievement.id}
                    whileHover={{ scale: 1.05 }}
                    className="bg-gray-50 rounded-lg p-3 flex flex-col items-center text-center"
                  >
                    <div className="w-16 h-16 mb-2">
                      <img 
                        src={achievement.image} 
                        alt={achievement.name} 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="font-medium text-sm mb-1">{achievement.name}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(achievement.unlockedAt!).toLocaleDateString('pt-BR')}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {nextToUnlock.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Próximas Conquistas</h3>
                <div className="space-y-3">
                  {nextToUnlock.map(achievement => (
                    <div 
                      key={achievement.id}
                      className="bg-gray-50 rounded-lg p-3 border border-dashed border-gray-300"
                    >
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <img 
                            src={achievement.image} 
                            alt={achievement.name} 
                            className="w-10 h-10 object-contain opacity-50 grayscale"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">{achievement.name}</h4>
                          <p className="text-xs text-gray-600">{achievement.description}</p>
                          <div className="flex items-center mt-1">
                            <span 
                              className="text-xs px-2 py-0.5 rounded-full capitalize font-medium mr-2"
                              style={{
                                backgroundColor: achievement.level === 'bronze' ? '#CD7F32' :
                                            achievement.level === 'prata' ? '#C0C0C0' :
                                            achievement.level === 'ouro' ? '#FFD700' : '#B9F2FF',
                                color: achievement.level === 'bronze' || achievement.level === 'ouro' ? '#7B3F00' : '#2C3E50',
                                opacity: 0.5
                              }}
                            >
                              {achievement.level}
                            </span>
                            <span className="text-xs text-gray-500">
                              +{achievement.points} pts
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-6 text-center">
              <Button
                variant="outline"
                onClick={unlockRandomAchievement}
                className="bg-clinic-yellow text-black hover:bg-clinic-yellow/90 border-none"
              >
                <Trophy className="h-4 w-4 mr-2" />
                Simular Nova Conquista
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <AchievementGallery achievements={achievements} />
      )}
      
      {unlockedAchievement && (
        <AchievementUnlockedModal 
          achievement={unlockedAchievement} 
          onClose={() => setUnlockedAchievement(null)} 
        />
      )}
    </div>
  );
};

export default PatientAchievementsTab;
