
import React from 'react';
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';

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

interface GoalsTabProps {
  goalsData: GoalType[];
  setSelectedGoal: (goalId: number | null) => void;
  setShowEvidenceModal: (show: boolean) => void;
}

const GoalsTab = ({ goalsData, setSelectedGoal, setShowEvidenceModal }: GoalsTabProps) => {
  return (
    <div className="p-3 md:p-6">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-3 md:p-4 border-b">
          <h2 className="text-lg md:text-xl font-bold">Todas as Minhas Metas</h2>
        </div>
        
        <div className="p-3 md:p-4">
          <div className="space-y-4 md:space-y-6">
            {goalsData.map((goal) => (
              <div 
                key={goal.id}
                className={`border-l-4 p-3 md:p-4 rounded-r-lg bg-gray-50 ${
                  goal.status === "completed" 
                    ? "border-green-500" 
                    : goal.status === "in-progress"
                      ? "border-clinic-yellow"
                      : "border-gray-300"
                }`}
              >
                <div className="flex justify-between items-start flex-col sm:flex-row gap-2 sm:gap-0">
                  <div>
                    <h3 className="font-bold text-base md:text-lg">{goal.title}</h3>
                    <p className="text-xs md:text-sm text-gray-600 mt-1">{goal.description}</p>
                  </div>
                  
                  <div className="self-start">
                    {goal.status === "completed" && (
                      <span className="px-2 py-1 text-xs md:text-sm rounded-full bg-green-100 text-green-800 flex items-center whitespace-nowrap">
                        <CheckCircle className="h-3 w-3 md:h-4 md:w-4 mr-1" /> Concluída
                      </span>
                    )}
                    {goal.status === "in-progress" && (
                      <span className="px-2 py-1 text-xs md:text-sm rounded-full bg-blue-100 text-blue-800 flex items-center whitespace-nowrap">
                        <Clock className="h-3 w-3 md:h-4 md:w-4 mr-1" /> Em Progresso
                      </span>
                    )}
                    {goal.status === "pending" && (
                      <span className="px-2 py-1 text-xs md:text-sm rounded-full bg-yellow-100 text-yellow-800 flex items-center whitespace-nowrap">
                        <AlertTriangle className="h-3 w-3 md:h-4 md:w-4 mr-1" /> Pendente
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="mt-3 md:mt-4 grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 text-xs md:text-sm">
                  <div>
                    <span className="text-gray-600">Profissional:</span>
                    <span className="ml-1 md:ml-2">{goal.professional}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Data limite:</span>
                    <span className="ml-1 md:ml-2">{goal.dueDate}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Prioridade:</span>
                    <span className={`ml-1 md:ml-2 px-2 py-0.5 rounded-full text-xs ${
                      goal.priority === "alta" 
                        ? "bg-red-100 text-red-800" 
                        : goal.priority === "média"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                    }`}>
                      {goal.priority.charAt(0).toUpperCase() + goal.priority.slice(1)}
                    </span>
                  </div>
                </div>
                
                <div className="mt-3 md:mt-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Progresso</span>
                    <span>{goal.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${goal.status === "completed" ? "bg-green-500" : "bg-clinic-yellow"}`}
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                {goal.status !== "completed" && (
                  <div className="mt-3 md:mt-4">
                    <button
                      onClick={() => {
                        setSelectedGoal(goal.id);
                        setShowEvidenceModal(true);
                      }}
                      className="px-3 md:px-4 py-1 md:py-2 bg-clinic-yellow text-black rounded-md hover:bg-clinic-yellow/90 text-xs md:text-sm"
                    >
                      Registrar Progresso
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalsTab;
