
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

type Achievement = {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
  level: 'bronze' | 'prata' | 'ouro';
  unlockedAt: string | null;
};

type AchievementCardProps = {
  achievement: Achievement;
};

const AchievementCard = ({ achievement }: AchievementCardProps) => {
  const isUnlocked = !!achievement.unlockedAt;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };
  
  const levelColors = {
    bronze: "bg-amber-100 text-amber-800 border-amber-300",
    prata: "bg-gray-100 text-gray-800 border-gray-300",
    ouro: "bg-yellow-100 text-yellow-800 border-yellow-300"
  };

  return (
    <Card className={cn(
      "overflow-hidden transition-all", 
      isUnlocked ? "opacity-100" : "opacity-50"
    )}>
      <div className="relative">
        <div className="h-36 flex items-center justify-center bg-gray-100">
          <img 
            src={achievement.image} 
            alt={achievement.name} 
            className="h-32 w-32 object-contain"
          />
        </div>
        <div 
          className={cn(
            "absolute bottom-2 right-2 px-2 py-1 rounded-full text-xs font-medium border",
            levelColors[achievement.level]
          )}
        >
          {achievement.level.charAt(0).toUpperCase() + achievement.level.slice(1)}
        </div>
      </div>
      <CardContent className="pt-4">
        <div className="text-xs text-gray-500 mb-1">
          {achievement.category}
        </div>
        <h3 className="font-bold mb-1">{achievement.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
        
        {isUnlocked ? (
          <div className="flex items-center text-xs text-green-600">
            <Trophy className="h-3 w-3 mr-1" />
            <span>Conquistado em {formatDate(achievement.unlockedAt!)}</span>
          </div>
        ) : (
          <div className="flex items-center text-xs text-gray-500">
            <Calendar className="h-3 w-3 mr-1" />
            <span>Ainda não conquistado</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AchievementCard;
