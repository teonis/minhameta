
import React from 'react';
import ComunidadeMeta from '@/components/social/ComunidadeMeta';
import { CheckCircle } from 'lucide-react';

interface GoalType {
  id: number;
  title: string;
  status: string;
  dueDate: string;
  priority: string;
  description: string;
  progress: number;
  professional: string;
}

interface PatientData {
  id: number;
  name: string;
  email: string;
  profilePicture: string | null;
  joinedDate: string;
}

interface AchievementType {
  id: number;
  title: string;
  date: string;
  description: string;
}

interface DashboardTabProps {
  goalsData: GoalType[];
  patientData: PatientData;
  profileImage: string | null;
  achievementsData: AchievementType[];
  setSelectedGoal: (goalId: number | null) => void;
  setShowEvidenceModal: (show: boolean) => void;
  setActiveTab: (tab: string) => void;
  triggerFileInput: () => void;
}

const DashboardTab = ({ 
  goalsData, 
  patientData, 
  profileImage, 
  achievementsData,
  setSelectedGoal,
  setShowEvidenceModal,
  setActiveTab,
  triggerFileInput
}: DashboardTabProps) => {
  return (
    <div className="p-3 md:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 mb-4 md:mb-8">
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-bold mb-1 md:mb-2">Metas Ativas</h2>
          <p className="text-2xl md:text-3xl font-bold">{goalsData.filter(g => g.status !== "completed").length}</p>
          <p className="text-xs md:text-sm text-gray-600">Total de metas em andamento</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-bold mb-1 md:mb-2">Metas Concluídas</h2>
          <p className="text-2xl md:text-3xl font-bold">{goalsData.filter(g => g.status === "completed").length}</p>
          <p className="text-xs md:text-sm text-gray-600">Total de metas finalizadas</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 sm:col-span-2 md:col-span-1">
          <h2 className="text-lg md:text-xl font-bold mb-1 md:mb-2">Conquistas</h2>
          <p className="text-2xl md:text-3xl font-bold">{achievementsData.length}</p>
          <p className="text-xs md:text-sm text-gray-600">Total de conquistas obtidas</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-4 md:mb-6">
            <h2 className="text-lg md:text-xl font-bold mb-2 md:mb-4">Metas Recentes</h2>
            
            <div className="space-y-3 md:space-y-4">
              {goalsData.slice(0, 3).map((goal) => (
                <div key={goal.id} className="border-l-4 border-clinic-yellow p-3 md:p-4 bg-gray-50 rounded-r-lg">
                  <div className="flex justify-between items-start flex-col sm:flex-row gap-2 sm:gap-0">
                    <div>
                      <h3 className="font-bold text-sm md:text-base">{goal.title}</h3>
                      <p className="text-xs md:text-sm text-gray-600 mt-1">{goal.description}</p>
                      <p className="text-xs text-gray-500 mt-1 md:mt-2">Profissional: {goal.professional}</p>
                    </div>
                    {goal.status === "completed" ? (
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 flex items-center whitespace-nowrap">
                        <CheckCircle className="h-3 w-3 mr-1" /> Concluída
                      </span>
                    ) : (
                      <button
                        onClick={() => {
                          setSelectedGoal(goal.id);
                          setShowEvidenceModal(true);
                        }}
                        className="px-2 py-1 text-xs bg-clinic-yellow text-black rounded-md hover:bg-clinic-yellow/90 whitespace-nowrap"
                      >
                        Registrar Progresso
                      </button>
                    )}
                  </div>
                  <div className="mt-2 md:mt-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Progresso</span>
                      <span>{goal.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-clinic-yellow"
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-3 md:mt-4 text-center">
              <button
                onClick={() => setActiveTab("goals")}
                className="text-xs md:text-sm text-blue-600 hover:underline"
              >
                Ver Todas as Metas
              </button>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
            <div className="flex justify-between items-center mb-3 md:mb-4">
              <h2 className="text-lg md:text-xl font-bold">Meu Perfil</h2>
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={triggerFileInput}
              >
                <span className="sr-only">Editar</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                </svg>
              </button>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="relative mb-3 md:mb-4">
                <div className="h-16 w-16 md:h-24 md:w-24 rounded-full bg-gray-200 overflow-hidden">
                  {profileImage ? (
                    <img 
                      src={profileImage} 
                      alt="Foto de perfil" 
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-clinic-yellow">
                      <span className="text-xl md:text-2xl font-bold text-black">
                        {patientData.name.split(" ").map(n => n[0]).join("")}
                      </span>
                    </div>
                  )}
                </div>
                <button 
                  className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md border border-gray-200"
                  onClick={triggerFileInput}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                    <circle cx="12" cy="13" r="4"></circle>
                  </svg>
                </button>
              </div>
              
              <h3 className="font-bold text-base md:text-lg">{patientData.name}</h3>
              <p className="text-xs md:text-sm text-gray-600">{patientData.email}</p>
              
              <div className="w-full mt-3 md:mt-4 space-y-2 md:space-y-3">
                <div className="flex justify-between text-xs md:text-sm">
                  <span className="text-gray-600">Membro desde:</span>
                  <span>{patientData.joinedDate}</span>
                </div>
                <div className="flex justify-between text-xs md:text-sm">
                  <span className="text-gray-600">Total de metas:</span>
                  <span>{goalsData.length}</span>
                </div>
                <div className="flex justify-between text-xs md:text-sm">
                  <span className="text-gray-600">Metas concluídas:</span>
                  <span>{goalsData.filter(g => g.status === "completed").length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 md:mt-6">
        <ComunidadeMeta />
      </div>
    </div>
  );
};

export default DashboardTab;
