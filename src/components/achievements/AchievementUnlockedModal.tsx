
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy } from 'lucide-react';
import { Achievement } from './types';
import confetti from 'canvas-confetti';

interface AchievementUnlockedModalProps {
  achievement: Achievement | null;
  onClose: () => void;
}

const AchievementUnlockedModal = ({ 
  achievement, 
  onClose 
}: AchievementUnlockedModalProps) => {
  useEffect(() => {
    if (achievement) {
      // Disparar confete quando a conquista é mostrada
      const colors = {
        bronze: ['#CD7F32', '#8B4513'],
        prata: ['#C0C0C0', '#A9A9A9'],
        ouro: ['#FFD700', '#DAA520'],
        diamante: ['#B9F2FF', '#87CEEB']
      };
      
      const selectedColors = colors[achievement.level] || ['#FFD700', '#DAA520'];
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: selectedColors
      });
      
      // Auto-fechar após 5 segundos
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [achievement, onClose]);
  
  if (!achievement) return null;
  
  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-white rounded-lg overflow-hidden shadow-xl max-w-md w-full"
        >
          <div className="relative">
            <button
              onClick={onClose}
              className="absolute right-2 top-2 p-1 rounded-full bg-white/80 hover:bg-white z-10"
            >
              <X className="h-4 w-4" />
            </button>
            
            <div className="pt-8 px-6 pb-6 bg-gradient-to-b from-yellow-50 to-white text-center">
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-2 text-xl font-bold text-yellow-800"
              >
                Nova Conquista Desbloqueada!
              </motion.div>
              
              <motion.div
                className="relative mx-auto w-32 h-32 mb-4"
                initial={{ rotate: -10, scale: 0.8 }}
                animate={{ 
                  rotate: [0, 15, -15, 0],
                  scale: [0.8, 1.2, 1]
                }}
                transition={{
                  duration: 1.5,
                  times: [0, 0.4, 0.8, 1]
                }}
              >
                <div className="absolute inset-0 bg-yellow-300 rounded-full opacity-20 animate-ping" />
                <div className="relative z-10">
                  <img
                    src={achievement.image}
                    alt={achievement.name}
                    className="w-32 h-32 object-contain"
                  />
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="text-2xl font-bold mb-2">{achievement.name}</h3>
                <p className="text-gray-600 mb-4">{achievement.description}</p>
                
                <div className="flex items-center justify-center mb-2">
                  <Trophy className="h-5 w-5 text-clinic-yellow mr-1" />
                  <span 
                    className="text-sm font-medium px-3 py-1 rounded-full capitalize"
                    style={{
                      backgroundColor: achievement.level === 'bronze' ? '#CD7F32' :
                                     achievement.level === 'prata' ? '#C0C0C0' :
                                     achievement.level === 'ouro' ? '#FFD700' : '#B9F2FF',
                      color: achievement.level === 'bronze' || achievement.level === 'ouro' ? '#7B3F00' : '#2C3E50'
                    }}
                  >
                    {achievement.level}
                  </span>
                </div>
                
                <div className="text-sm text-gray-500">
                  + {achievement.points} pontos
                </div>
              </motion.div>
            </div>
            
            <div className="px-6 py-4 bg-gray-50 border-t flex justify-center">
              <button
                onClick={onClose}
                className="bg-clinic-yellow text-black px-4 py-2 rounded-md hover:bg-clinic-yellow/90 transition-colors"
              >
                Continuar
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AchievementUnlockedModal;
