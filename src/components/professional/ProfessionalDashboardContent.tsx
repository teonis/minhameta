
import { useProfessionalDashboard } from "@/contexts/ProfessionalDashboardContext";
import DashboardView from "./DashboardView";
import PatientsListView from "./PatientsListView";
import PatientDetailsView from "./PatientDetailsView";
import SettingsView from "./SettingsView";
import ProfessionalAnalyticsTab from "./tabs/ProfessionalAnalyticsTab";

const ProfessionalDashboardContent = () => {
  const {
    activeTab,
    viewingPatientDetails,
    currentPatient,
    patientGoals,
    patientsData,
    goalsData,
    isGroupGoal,
    selectedPatients,
    handleTogglePatientSelection,
    handlePatientSelect,
    handleViewPatientDetails,
    handleOpenGroupGoalModal,
    handleBackToPatientsList,
    handleOpenAIAssistant,
    setShowAddPatientModal
  } = useProfessionalDashboard();

  return (
    <>
      {activeTab === "dashboard" && (
        <DashboardView 
          patientsData={patientsData}
          goalsData={goalsData}
          onAddPatient={() => setShowAddPatientModal(true)}
          onAddGoal={() => handlePatientSelect(patientsData[0].id)}
          onPatientSelect={handlePatientSelect}
          onOpenGroupGoalModal={handleOpenGroupGoalModal}
        />
      )}
      
      {activeTab === "patients" && !viewingPatientDetails && (
        <PatientsListView 
          patientsData={patientsData}
          isGroupGoal={isGroupGoal}
          selectedPatients={selectedPatients}
          onTogglePatientSelection={handleTogglePatientSelection}
          onPatientSelect={handlePatientSelect}
          onViewPatientDetails={handleViewPatientDetails}
          onAddPatient={() => setShowAddPatientModal(true)}
          onOpenGroupGoal={handleOpenGroupGoalModal}
        />
      )}
      
      {activeTab === "patients" && viewingPatientDetails && currentPatient && (
        <PatientDetailsView
          currentPatient={currentPatient}
          patientGoals={patientGoals}
          onBackToPatientsList={handleBackToPatientsList}
          onAddGoal={handlePatientSelect}
          onOpenAIAssistant={handleOpenAIAssistant}
        />
      )}
      
      {activeTab === "analytics" && (
        <ProfessionalAnalyticsTab />
      )}
      
      {activeTab === "settings" && <SettingsView />}
    </>
  );
};

export default ProfessionalDashboardContent;
