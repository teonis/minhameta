import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users } from 'lucide-react';
import { Group } from './types';

type GroupCardProps = {
  group: Group;
};

const GroupCard = ({ group }: GroupCardProps) => {
  return (
    <Card className="overflow-hidden">
      <div 
        className="h-32 bg-cover bg-center" 
        style={{ backgroundImage: `url(${group.coverImage})` }}
      >
        <div className="w-full h-full bg-black/30 p-4">
          <h3 className="text-white font-bold text-lg">{group.name}</h3>
        </div>
      </div>
      <CardContent className="pt-4">
        <p className="text-sm text-gray-600 mb-2">{group.description}</p>
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarFallback className="text-xs bg-clinic-yellow text-black">
              {group.professionalName.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <span className="text-xs">Coordenado por <span className="font-medium">{group.professionalName}</span></span>
        </div>
        <div className="flex items-center text-xs text-gray-500 mt-1">
          <Users className="h-3 w-3 mr-1" />
          <span>{group.memberCount} membros</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-clinic-yellow text-black hover:bg-clinic-yellow/90">
          Participar do Grupo
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GroupCard;
