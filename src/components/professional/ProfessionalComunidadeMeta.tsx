
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Users, MessageSquare, Award, Trophy, Target, Settings } from 'lucide-react';
import { mockPosts, mockGroups, mockChallenges, mockAchievements } from '../social/types';
import ProfessionalFeedTab from './tabs/ProfessionalFeedTab';
import ProfessionalGroupsTab from './tabs/ProfessionalGroupsTab';
import ProfessionalChallengesTab from './tabs/ProfessionalChallengesTab';
import ProfessionalAchievementsTab from './tabs/ProfessionalAchievementsTab';
import ProfessionalAnalyticsTab from './tabs/ProfessionalAnalyticsTab';

const ProfessionalComunidadeMeta = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6 text-clinic-yellow" />
          <h2 className="text-xl font-bold">Comunidade Meta</h2>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-gray-100">Beta</Badge>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Settings className="h-4 w-4" /> Configurações
          </Button>
        </div>
      </div>

      <Tabs defaultValue="feed" className="w-full">
        <TabsList className="mb-4 w-full justify-start">
          <TabsTrigger value="feed" className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" /> Feed
          </TabsTrigger>
          <TabsTrigger value="groups" className="flex items-center gap-1">
            <Users className="h-4 w-4" /> Grupos
          </TabsTrigger>
          <TabsTrigger value="challenges" className="flex items-center gap-1">
            <Target className="h-4 w-4" /> Desafios
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex items-center gap-1">
            <Award className="h-4 w-4" /> Conquistas
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-1">
            <Trophy className="h-4 w-4" /> Análises
          </TabsTrigger>
        </TabsList>

        <TabsContent value="feed">
          <ProfessionalFeedTab posts={mockPosts} />
        </TabsContent>

        <TabsContent value="groups">
          <ProfessionalGroupsTab groups={mockGroups} />
        </TabsContent>

        <TabsContent value="challenges">
          <ProfessionalChallengesTab challenges={mockChallenges} groups={mockGroups} />
        </TabsContent>

        <TabsContent value="achievements">
          <ProfessionalAchievementsTab achievements={mockAchievements} />
        </TabsContent>

        <TabsContent value="analytics">
          <ProfessionalAnalyticsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfessionalComunidadeMeta;
