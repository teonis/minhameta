
import React from 'react';
import { Button } from "@/components/ui/button";
import { Users } from 'lucide-react';
import GroupCard from '../GroupCard';
import { Group } from '../types';

type GroupsTabProps = {
  groups: Group[];
};

const GroupsTab = ({ groups }: GroupsTabProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {groups.map(group => (
          <GroupCard key={group.id} group={group} />
        ))}
      </div>
      <Button className="bg-clinic-yellow text-black hover:bg-clinic-yellow/90 w-full">
        <Users className="h-4 w-4 mr-1" /> Ver Todos os Grupos
      </Button>
    </div>
  );
};

export default GroupsTab;
