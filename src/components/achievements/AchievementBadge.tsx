
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Lock, Info } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from '@/lib/utils';
import { Achievement } from './types';

interface AchievementBadgeProps {
  achievement: Achievement;
  showUnlockAnimation?: boolean;
}

const AchievementBadge = ({ 
  achievement, 
  showUnlockAnimation = false 
}: AchievementBadgeProps) => {
  const [showDetails, setShowDetails] = useState(false);
  
  // Determine se está bloqueada
  const isLocked = !achievement.unlockedAt;
  
  // Determine se é uma conquista surpresa escondida
  const isHidden = achievement.isHidden && isLocked;
  
  const levelColors = {
    bronze: "bg-amber-100 text-amber-800 border-amber-300",
    prata: "bg-gray-100 text-gray-600 border-gray-300",
    ouro: "bg-yellow-100 text-yellow-800 border-yellow-300",
    diamante: "bg-blue-100 text-blue-800 border-blue-300"
  };
  
  const categoryIcons = {
    progresso: <Trophy className="h-4 w-4" />,
    consistência: <Trophy className="h-4 w-4" />,
    metas: <Trophy className="h-4 w-4" />,
    comunidade: <Trophy className="h-4 w-4" />,
    surpresa: <Trophy className="h-4 w-4" />
  };
  
  // Animações
  const badgeVariants = {
    locked: { 
      scale: 1,
      opacity: 0.5,
      filter: "grayscale(100%)"
    },
    unlocked: { 
      scale: 1,
      opacity: 1,
      filter: "grayscale(0%)"
    },
    hidden: {
      scale: 1,
      opacity: 0.3,
      filter: "blur(4px)"
    },
    unlocking: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 1, 1],
      filter: ["grayscale(100%)", "grayscale(0%)", "grayscale(0%)"],
      rotate: [0, 10, -10, 0],
      transition: {
        duration: 1.5,
        times: [0, 0.5, 1]
      }
    }
  };
  
  const glowVariants = {
    inactive: { opacity: 0 },
    active: { 
      opacity: [0, 0.8, 0],
      scale: [1, 1.5, 1.8],
      transition: {
        repeat: Infinity,
        duration: 2
      }
    }
  };
  
  // Determinar animação inicial
  const initialAnimation = isHidden ? "hidden" : (isLocked ? "locked" : "unlocked");
  const currentAnimation = showUnlockAnimation ? "unlocking" : initialAnimation;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="relative group">
            <motion.div
              className={cn(
                "relative w-20 h-20 rounded-full overflow-hidden border-2 flex items-center justify-center",
                isLocked ? "border-gray-300" : `border-${achievement.level === 'diamante' ? 'blue' : achievement.level}-400`
              )}
              initial={initialAnimation}
              animate={currentAnimation}
              variants={badgeVariants}
              onClick={() => !isHidden && setShowDetails(!showDetails)}
            >
              {isHidden ? (
                <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                  <Lock className="h-8 w-8 text-gray-400" />
                </div>
              ) : (
                <>
                  <img 
                    src={achievement.image} 
                    alt={achievement.name} 
                    className="w-16 h-16 object-contain z-10"
                  />
                  {showUnlockAnimation && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-yellow-300"
                      initial="inactive"
                      animate="active"
                      variants={glowVariants}
                    />
                  )}
                </>
              )}
            </motion.div>
            
            {!isHidden && !isLocked && (
              <span 
                className={cn(
                  "absolute -bottom-1 left-1/2 transform -translate-x-1/2 text-xs font-medium px-2 py-0.5 rounded-full border",
                  levelColors[achievement.level]
                )}
              >
                {achievement.level}
              </span>
            )}
            
            {!isHidden && (
              <motion.div 
                className="absolute -top-1 -right-1 bg-white rounded-full shadow-sm p-1 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDetails(!showDetails);
                }}
              >
                <Info className="h-3 w-3 text-gray-600" />
              </motion.div>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" align="center" className="p-0 overflow-hidden max-w-[250px]">
          {isHidden ? (
            <div className="bg-gray-800 text-white p-3 text-sm">
              <p className="font-medium">Conquista Surpresa</p>
              <p className="text-xs mt-1">Continue progredindo para desbloquear</p>
            </div>
          ) : (
            <div className="bg-white p-3 text-sm border">
              <div className="flex items-center gap-2 mb-1">
                <span className={cn(
                  "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
                  levelColors[achievement.level]
                )}>
                  {categoryIcons[achievement.category]}
                  <span className="ml-1">{achievement.category}</span>
                </span>
              </div>
              <p className="font-medium">{achievement.name}</p>
              <p className="text-xs text-gray-600 mt-1">{achievement.description}</p>
              {isLocked ? (
                <p className="text-xs text-gray-600 mt-2 italic">{achievement.requirement}</p>
              ) : (
                <p className="text-xs text-green-600 mt-2">Desbloqueado em {new Date(achievement.unlockedAt!).toLocaleDateString('pt-BR')}</p>
              )}
            </div>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AchievementBadge;
