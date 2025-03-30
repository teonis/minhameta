
import React from 'react';
import { Button } from "@/components/ui/button";
import { Target } from 'lucide-react';
import ChallengeCard from '../ChallengeCard';
import { Challenge } from '../types';

type ChallengesTabProps = {
  challenges: Challenge[];
};

const ChallengesTab = ({ challenges }: ChallengesTabProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {challenges.map(challenge => (
          <ChallengeCard key={challenge.id} challenge={challenge} />
        ))}
      </div>
      <Button className="bg-clinic-yellow text-black hover:bg-clinic-yellow/90 w-full">
        <Target className="h-4 w-4 mr-1" /> Ver Todos os Desafios
      </Button>
    </div>
  );
};

export default ChallengesTab;
