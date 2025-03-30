
import { useProfessionalDashboard } from "@/contexts/ProfessionalDashboardContext";
import AddPatientModal from "./AddPatientModal";
import AddGoalModal from "./AddGoalModal";
import AIAssistantModal from "./AIAssistantModal";

const ProfessionalDashboardModals = () => {
  const {
    showAddPatientModal,
    setShowAddPatientModal,
    showAddGoalModal,
    setShowAddGoalModal,
    showAIAssistantModal,
    setShowAIAssistantModal,
    patientsData,
    goalTemplates,
    selectedPatient,
    isGroupGoal,
    selectedPatients,
    aiAssistantContext
  } = useProfessionalDashboard();

  return (
    <>
      {showAddPatientModal && (
        <AddPatientModal 
          isOpen={showAddPatientModal} 
          onClose={() => setShowAddPatientModal(false)} 
        />
      )}
      
      {showAddGoalModal && (
        <AddGoalModal 
          isOpen={showAddGoalModal}
          onClose={() => setShowAddGoalModal(false)}
          patientsData={patientsData}
          goalTemplates={goalTemplates}
          selectedPatient={selectedPatient}
          isGroupGoal={isGroupGoal}
          selectedPatients={selectedPatients}
        />
      )}
      
      {showAIAssistantModal && (
        <AIAssistantModal
          isOpen={showAIAssistantModal}
          onClose={() => setShowAIAssistantModal(false)}
          patientId={aiAssistantContext.patientId}
          patientName={aiAssistantContext.patientName}
          patientGoals={aiAssistantContext.patientGoals}
        />
      )}
    </>
  );
};

export default ProfessionalDashboardModals;
