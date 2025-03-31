
import { ArrowLeft } from "lucide-react";

type BackToPatientsListProps = {
  onBackToPatientsList: () => void;
};

const BackToPatientsList = ({ onBackToPatientsList }: BackToPatientsListProps) => {
  return (
    <button 
      onClick={onBackToPatientsList}
      className="flex items-center text-secondary mb-6 hover:underline"
    >
      <ArrowLeft className="h-4 w-4 mr-1" />
      Voltar para lista de pacientes
    </button>
  );
};

export default BackToPatientsList;
