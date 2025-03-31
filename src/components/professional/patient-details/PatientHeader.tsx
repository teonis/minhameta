
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GoalType, PatientType } from "@/types/professional";

type PatientHeaderProps = {
  currentPatient: PatientType;
  onBackToPatientsList: () => void;
  onAddGoal: (patientId: number) => void;
  onOpenAIAssistant?: (patientId: number, patientName: string, patientGoals: GoalType[]) => void;
  patientGoals: GoalType[];
};

const PatientHeader = ({
  currentPatient,
  onBackToPatientsList,
  onAddGoal,
  onOpenAIAssistant,
  patientGoals
}: PatientHeaderProps) => {
  return (
    <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center">
          <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="font-bold text-gray-700 text-xl">
              {currentPatient.name.split(" ").map(n => n[0]).join("")}
            </span>
          </div>
          <div className="ml-4">
            <h2 className="text-2xl font-bold">{currentPatient.name}</h2>
            <div className="text-gray-600">{currentPatient.email}</div>
            <div className="text-gray-600">{currentPatient.phone}</div>
            <div className="mt-1 text-sm">
              <span className="font-semibold">Última atividade:</span> {currentPatient.lastActivity}
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          {onOpenAIAssistant && (
            <Button
              variant="outline"
              className="border-clinic-yellow text-clinic-black hover:bg-clinic-yellow/10"
              onClick={() => onOpenAIAssistant(currentPatient.id, currentPatient.name, patientGoals)}
            >
              <Sparkles className="h-4 w-4 mr-1 text-clinic-yellow" />
              Assistente IA
            </Button>
          )}
          
          <button
            className="bg-clinic-yellow text-black px-4 py-2 rounded-md hover:bg-clinic-yellow/90"
            onClick={() => onAddGoal(currentPatient.id)}
          >
            <span className="mr-1">+</span>
            Nova Meta
          </button>
        </div>
      </div>
      
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div>
          <span className="text-gray-700">Progresso</span>
          <div className="text-2xl font-bold">
            {currentPatient.completedGoals}/{currentPatient.totalGoals} metas
          </div>
        </div>
        <div className="w-64 h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-clinic-yellow"
            style={{ width: `${(currentPatient.completedGoals / currentPatient.totalGoals) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default PatientHeader;
