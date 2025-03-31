
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Medal, 
  Filter, 
  ChevronDown, 
  Search,
  Award,
  Lock
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Achievement, AchievementCategory, AchievementLevel } from './types';
import AchievementBadge from './AchievementBadge';

interface AchievementGalleryProps {
  achievements: Achievement[];
  onlyUnlocked?: boolean;
}

const AchievementGallery = ({ 
  achievements,
  onlyUnlocked = false 
}: AchievementGalleryProps) => {
  const [filter, setFilter] = useState<AchievementCategory | 'todas'>('todas');
  const [levelFilter, setLevelFilter] = useState<AchievementLevel | 'todas'>('todas');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'coleção' | 'estatísticas'>('coleção');
  const [showUnlockAnimation, setShowUnlockAnimation] = useState<string | null>(null);
  
  // Estatísticas de conquistas
  const totalUnlocked = achievements.filter(a => a.unlockedAt).length;
  const totalAchievements = achievements.length;
  const progressPercentage = Math.round((totalUnlocked / totalAchievements) * 100);
  
  // Pontos totais
  const totalPoints = achievements
    .filter(a => a.unlockedAt)
    .reduce((sum, a) => sum + a.points, 0);
  
  // Filtragem de conquistas
  const filteredAchievements = achievements
    .filter(a => onlyUnlocked ? a.unlockedAt : true)
    .filter(a => filter === 'todas' ? true : a.category === filter)
    .filter(a => levelFilter === 'todas' ? true : a.level === levelFilter)
    .filter(a => {
      if (!searchTerm) return true;
      const term = searchTerm.toLowerCase();
      return (
        a.name.toLowerCase().includes(term) || 
        a.description.toLowerCase().includes(term)
      );
    });
  
  // Simulação de desbloqueio de conquista
  const simulateUnlock = (id: string) => {
    setShowUnlockAnimation(id);
    setTimeout(() => setShowUnlockAnimation(null), 2000);
  };
  
  // Agrupar por categoria
  const achievementsByCategory: Record<AchievementCategory | 'surpresa', Achievement[]> = {
    progresso: [],
    consistência: [],
    metas: [],
    comunidade: [],
    surpresa: []
  };
  
  filteredAchievements.forEach(achievement => {
    const category = achievement.category;
    if (achievementsByCategory[category]) {
      achievementsByCategory[category].push(achievement);
    }
  });
  
  return (
    <div className="bg-white rounded-lg shadow p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold flex items-center">
            <Trophy className="h-5 w-5 md:h-6 md:w-6 mr-2 text-clinic-yellow" />
            Conquistas e Medalhas
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {totalUnlocked} de {totalAchievements} conquistas desbloqueadas
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar conquistas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 h-9"
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 h-9 px-3 border rounded-md hover:bg-gray-50">
              <Filter className="h-4 w-4" />
              <span className="hidden md:inline text-sm">Categoria</span>
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setFilter('todas')}>
                Todas
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter('progresso')}>
                Progresso
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter('consistência')}>
                Consistência
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter('metas')}>
                Metas
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter('comunidade')}>
                Comunidade
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter('surpresa')}>
                Surpresa
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 h-9 px-3 border rounded-md hover:bg-gray-50">
              <Medal className="h-4 w-4" />
              <span className="hidden md:inline text-sm">Nível</span>
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setLevelFilter('todas')}>
                Todos
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLevelFilter('bronze')}>
                Bronze
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLevelFilter('prata')}>
                Prata
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLevelFilter('ouro')}>
                Ouro
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLevelFilter('diamante')}>
                Diamante
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'coleção' | 'estatísticas')}>
        <TabsList className="mb-4">
          <TabsTrigger value="coleção" className="flex items-center gap-1">
            <Trophy className="h-4 w-4" />
            <span>Coleção</span>
          </TabsTrigger>
          <TabsTrigger value="estatísticas" className="flex items-center gap-1">
            <Award className="h-4 w-4" />
            <span>Estatísticas</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="coleção">
          <AnimatePresence>
            {Object.entries(achievementsByCategory).map(([category, categoryAchievements]) => (
              categoryAchievements.length > 0 && (
                <motion.div 
                  key={category}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-6"
                >
                  <h3 className="text-lg font-semibold mb-3 capitalize">
                    {category}
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                    {categoryAchievements.map(achievement => (
                      <div 
                        key={achievement.id} 
                        className="flex flex-col items-center cursor-pointer"
                        onClick={() => {
                          if (!achievement.unlockedAt && !achievement.isHidden) {
                            simulateUnlock(achievement.id);
                          }
                        }}
                      >
                        <AchievementBadge 
                          achievement={achievement} 
                          showUnlockAnimation={showUnlockAnimation === achievement.id}
                        />
                        <p className="mt-2 text-xs text-center font-medium">
                          {achievement.isHidden && !achievement.unlockedAt ? (
                            "???"
                          ) : (
                            achievement.name
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )
            ))}
            
            {filteredAchievements.length === 0 && (
              <div className="flex flex-col items-center justify-center py-10 text-gray-500">
                <Lock className="h-12 w-12 mb-2 text-gray-300" />
                <p>Nenhuma conquista encontrada</p>
                <p className="text-sm">Tente ajustar os filtros de busca</p>
              </div>
            )}
          </AnimatePresence>
        </TabsContent>
        
        <TabsContent value="estatísticas">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold">Progresso Total</h3>
              <div className="flex items-center mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-clinic-yellow h-2.5 rounded-full" 
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <span className="ml-2 text-sm font-medium">{progressPercentage}%</span>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold">Conquistas</h3>
              <p className="text-3xl font-bold mt-2">{totalUnlocked} <span className="text-sm text-gray-500 font-normal">/ {totalAchievements}</span></p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold">Pontos</h3>
              <p className="text-3xl font-bold mt-2">{totalPoints}</p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold mb-3">Conquistas por Nível</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(['bronze', 'prata', 'ouro', 'diamante'] as AchievementLevel[]).map(level => {
                const levelAchievements = achievements.filter(a => a.level === level);
                const unlockedCount = levelAchievements.filter(a => a.unlockedAt).length;
                const levelProgressPercentage = Math.round((unlockedCount / levelAchievements.length) * 100) || 0;
                
                return (
                  <div key={level} className="text-center">
                    <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center border-4 ${
                      level === 'bronze' ? 'border-amber-400 bg-amber-50' :
                      level === 'prata' ? 'border-gray-400 bg-gray-50' :
                      level === 'ouro' ? 'border-yellow-400 bg-yellow-50' :
                      'border-blue-400 bg-blue-50'
                    }`}>
                      <span className="text-xl font-bold">{unlockedCount}</span>
                    </div>
                    <p className="mt-2 capitalize font-medium">{level}</p>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                      <div 
                        className={`h-1.5 rounded-full ${
                          level === 'bronze' ? 'bg-amber-400' :
                          level === 'prata' ? 'bg-gray-400' :
                          level === 'ouro' ? 'bg-yellow-400' :
                          'bg-blue-400'
                        }`}
                        style={{ width: `${levelProgressPercentage}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{unlockedCount}/{levelAchievements.length}</p>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Conquistas por Categoria</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(achievementsByCategory).map(([category, categoryAchievements]) => {
                if (categoryAchievements.length === 0) return null;
                
                const unlockedCount = categoryAchievements.filter(a => a.unlockedAt).length;
                const categoryProgressPercentage = Math.round((unlockedCount / categoryAchievements.length) * 100);
                
                return (
                  <div key={category} className="flex items-center">
                    <div className="mr-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <Trophy className="h-5 w-5 text-gray-700" />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center justify-between">
                        <p className="font-medium capitalize">{category}</p>
                        <p className="text-sm">{unlockedCount}/{categoryAchievements.length}</p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-clinic-yellow h-2 rounded-full" 
                          style={{ width: `${categoryProgressPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AchievementGallery;
