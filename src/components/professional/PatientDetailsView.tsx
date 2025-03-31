
import { GoalType, PatientType } from "@/types/professional";
import BackToPatientsList from "./patient-details/BackToPatientsList";
import PatientHeader from "./patient-details/PatientHeader";
import PatientDetailsTabs from "./patient-details/PatientDetailsTabs";

type PatientDetailsViewProps = {
  currentPatient: PatientType;
  patientGoals: GoalType[];
  onBackToPatientsList: () => void;
  onAddGoal: (patientId: number) => void;
  onOpenAIAssistant?: (patientId: number, patientName: string, patientGoals: GoalType[]) => void;
};

const PatientDetailsView = ({
  currentPatient,
  patientGoals,
  onBackToPatientsList,
  onAddGoal,
  onOpenAIAssistant
}: PatientDetailsViewProps) => {
  return (
    <div className="p-6">
      <BackToPatientsList onBackToPatientsList={onBackToPatientsList} />
      
      <PatientHeader 
        currentPatient={currentPatient}
        onBackToPatientsList={onBackToPatientsList}
        onAddGoal={onAddGoal}
        onOpenAIAssistant={onOpenAIAssistant}
        patientGoals={patientGoals}
      />
      
      <PatientDetailsTabs 
        currentPatient={currentPatient} 
        patientGoals={patientGoals} 
      />
    </div>
  );
};

export default PatientDetailsView;
