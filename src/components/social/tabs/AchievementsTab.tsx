
import React from 'react';
import { Button } from "@/components/ui/button";
import { Trophy } from 'lucide-react';
import AchievementCard from '../AchievementCard';
import { Achievement } from '../types';

type AchievementsTabProps = {
  achievements: Achievement[];
};

const AchievementsTab = ({ achievements }: AchievementsTabProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {achievements.map(achievement => (
          <AchievementCard key={achievement.id} achievement={achievement} />
        ))}
      </div>
      <Button className="bg-clinic-yellow text-black hover:bg-clinic-yellow/90 w-full">
        <Trophy className="h-4 w-4 mr-1" /> Ver Todas as Conquistas
      </Button>
    </div>
  );
};

export default AchievementsTab;
