
import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  MessageSquare, 
  Award, 
  Target, 
  Home, 
  Search, 
  Heart, 
  User as UserIcon,
  PlusSquare 
} from 'lucide-react';
import FeedTab from './tabs/FeedTab';
import GroupsTab from './tabs/GroupsTab';
import ChallengesTab from './tabs/ChallengesTab';
import AchievementsTab from './tabs/AchievementsTab';
import StoriesSection from './instagram/StoriesSection';
import { mockPosts, mockGroups, mockChallenges, mockAchievements } from './types';
import { useIsMobile } from "@/hooks/use-mobile";

const ComunidadeMeta = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState('feed');
  
  return (
    <div className="bg-white min-h-screen">
      {!isMobile && (
        <div className="fixed left-0 top-0 w-64 h-full border-r border-gray-200 bg-white p-6 flex flex-col">
          <div className="flex items-center mb-10">
            <h2 className="text-xl font-bold">Minha Meta</h2>
          </div>
          
          <div className="flex-1 space-y-1">
            <button 
              onClick={() => setActiveTab('feed')}
              className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${activeTab === 'feed' ? 'font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Home className={`h-5 w-5 ${activeTab === 'feed' ? 'text-black' : 'text-gray-600'}`} />
              Página Inicial
            </button>
            
            <button 
              onClick={() => setActiveTab('explore')}
              className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${activeTab === 'explore' ? 'font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Search className={`h-5 w-5 ${activeTab === 'explore' ? 'text-black' : 'text-gray-600'}`} />
              Explorar
            </button>
            
            <button 
              onClick={() => setActiveTab('challenges')}
              className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${activeTab === 'challenges' ? 'font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Target className={`h-5 w-5 ${activeTab === 'challenges' ? 'text-black' : 'text-gray-600'}`} />
              Desafios
            </button>
            
            <button 
              onClick={() => setActiveTab('achievements')}
              className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${activeTab === 'achievements' ? 'font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Award className={`h-5 w-5 ${activeTab === 'achievements' ? 'text-black' : 'text-gray-600'}`} />
              Conquistas
            </button>
            
            <button 
              onClick={() => setActiveTab('groups')}
              className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${activeTab === 'groups' ? 'font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Users className={`h-5 w-5 ${activeTab === 'groups' ? 'text-black' : 'text-gray-600'}`} />
              Grupos
            </button>
            
            <button 
              onClick={() => setActiveTab('notifications')}
              className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${activeTab === 'notifications' ? 'font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Heart className={`h-5 w-5 ${activeTab === 'notifications' ? 'text-black' : 'text-gray-600'}`} />
              Notificações
            </button>
            
            <button 
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${activeTab === 'profile' ? 'font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <UserIcon className={`h-5 w-5 ${activeTab === 'profile' ? 'text-black' : 'text-gray-600'}`} />
              Perfil
            </button>
          </div>
          
          <button className="w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors hover:bg-gray-100 mt-auto">
            <PlusSquare className="h-5 w-5" />
            Criar
          </button>
        </div>
      )}
      
      <div className={`${!isMobile ? 'ml-64' : ''} max-w-xl mx-auto`}>
        {isMobile && (
          <div className="sticky top-0 z-30 bg-white border-b border-gray-200 py-3 px-4 flex justify-between items-center">
            <h2 className="text-xl font-bold">Minha Meta</h2>
            <div className="flex gap-4">
              <Heart className="h-6 w-6" />
              <MessageSquare className="h-6 w-6" />
            </div>
          </div>
        )}
        
        <div className="pb-14">
          <StoriesSection />
          
          {activeTab === 'feed' && <FeedTab posts={mockPosts} />}
          {activeTab === 'groups' && <GroupsTab groups={mockGroups} />}
          {activeTab === 'challenges' && <ChallengesTab challenges={mockChallenges} />}
          {activeTab === 'achievements' && <AchievementsTab achievements={mockAchievements} />}
        </div>
      </div>
      
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 flex justify-around z-10">
          <button onClick={() => setActiveTab('feed')} className="flex flex-col items-center justify-center text-gray-700 hover:text-clinic-yellow">
            <Home className={`h-6 w-6 ${activeTab === 'feed' ? 'text-clinic-yellow' : ''}`} />
            <span className="text-xs mt-1">Início</span>
          </button>
          
          <button onClick={() => setActiveTab('explore')} className="flex flex-col items-center justify-center text-gray-700 hover:text-clinic-yellow">
            <Search className={`h-6 w-6 ${activeTab === 'explore' ? 'text-clinic-yellow' : ''}`} />
            <span className="text-xs mt-1">Explorar</span>
          </button>
          
          <button className="flex flex-col items-center justify-center text-gray-700 hover:text-clinic-yellow">
            <PlusSquare className="h-6 w-6" />
            <span className="text-xs mt-1">Criar</span>
          </button>
          
          <button onClick={() => setActiveTab('notifications')} className="flex flex-col items-center justify-center text-gray-700 hover:text-clinic-yellow">
            <Heart className={`h-6 w-6 ${activeTab === 'notifications' ? 'text-clinic-yellow' : ''}`} />
            <span className="text-xs mt-1">Notificações</span>
          </button>
          
          <button onClick={() => setActiveTab('profile')} className="flex flex-col items-center justify-center text-gray-700 hover:text-clinic-yellow">
            <UserIcon className={`h-6 w-6 ${activeTab === 'profile' ? 'text-clinic-yellow' : ''}`} />
            <span className="text-xs mt-1">Perfil</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ComunidadeMeta;
