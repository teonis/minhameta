
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, MessageSquare, Award, Target } from 'lucide-react';
import FeedTab from './tabs/FeedTab';
import GroupsTab from './tabs/GroupsTab';
import ChallengesTab from './tabs/ChallengesTab';
import AchievementsTab from './tabs/AchievementsTab';
import { mockPosts, mockGroups, mockChallenges, mockAchievements } from './types';
import { useIsMobile } from "@/hooks/use-mobile";

const ComunidadeMeta = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-3 md:p-6 mb-4 md:mb-6">
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 md:h-6 md:w-6 text-clinic-yellow" />
          <h2 className="text-lg md:text-xl font-bold">Comunidade Meta</h2>
        </div>
        <Badge variant="outline" className="bg-gray-100 text-xs md:text-sm">Beta</Badge>
      </div>

      <Tabs defaultValue="feed" className="w-full">
        <TabsList className="mb-3 md:mb-4 w-full justify-start overflow-x-auto flex-nowrap">
          <TabsTrigger value="feed" className="flex items-center gap-1 text-xs md:text-sm whitespace-nowrap">
            <MessageSquare className="h-3 w-3 md:h-4 md:w-4" /> Feed
          </TabsTrigger>
          <TabsTrigger value="groups" className="flex items-center gap-1 text-xs md:text-sm whitespace-nowrap">
            <Users className="h-3 w-3 md:h-4 md:w-4" /> Grupos
          </TabsTrigger>
          <TabsTrigger value="challenges" className="flex items-center gap-1 text-xs md:text-sm whitespace-nowrap">
            <Target className="h-3 w-3 md:h-4 md:w-4" /> Desafios
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex items-center gap-1 text-xs md:text-sm whitespace-nowrap">
            <Award className="h-3 w-3 md:h-4 md:w-4" /> Conquistas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="feed">
          <FeedTab posts={mockPosts} />
        </TabsContent>

        <TabsContent value="groups">
          <GroupsTab groups={mockGroups} />
        </TabsContent>

        <TabsContent value="challenges">
          <ChallengesTab challenges={mockChallenges} />
        </TabsContent>

        <TabsContent value="achievements">
          <AchievementsTab achievements={mockAchievements} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComunidadeMeta;
