
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, Trophy } from 'lucide-react';

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

type ChallengeCardProps = {
  challenge: Challenge;
};

const ChallengeCard = ({ challenge }: ChallengeCardProps) => {
  const startDate = new Date(challenge.startDate);
  const endDate = new Date(challenge.endDate);
  const progressPercentage = Math.min(100, Math.round((challenge.currentProgress / challenge.collectiveGoal) * 100));
  
  const isActive = () => {
    const now = new Date();
    return now >= startDate && now <= endDate;
  };
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg">{challenge.title}</h3>
          <Badge className={isActive() ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
            {isActive() ? "Ativo" : "Encerrado"}
          </Badge>
        </div>
        
        <Badge variant="outline" className="mb-2">{challenge.groupName}</Badge>
        
        <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
        
        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{formatDate(startDate)} até {formatDate(endDate)}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-3 w-3 mr-1" />
            <span>{challenge.participants} participantes</span>
          </div>
        </div>
        
        <div className="mb-1 flex justify-between text-xs">
          <span>Progresso Coletivo</span>
          <span className="font-medium">{progressPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div 
            className="bg-clinic-yellow h-2 rounded-full" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        
        <div className="flex items-center justify-center gap-1 text-xs text-gray-600">
          <Trophy className="h-3 w-3" />
          <span>Meta: {challenge.collectiveGoal} pontos</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-clinic-yellow text-black hover:bg-clinic-yellow/90">
          {isActive() ? "Participar do Desafio" : "Ver Resultados"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ChallengeCard;
