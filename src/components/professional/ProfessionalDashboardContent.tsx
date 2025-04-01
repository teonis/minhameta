
import { useProfessionalDashboard } from "@/contexts/ProfessionalDashboardContext";
import DashboardView from "./DashboardView";
import PatientsListView from "./PatientsListView";
import PatientDetailsView from "./PatientDetailsView";
import SettingsView from "./SettingsView";
import ProfessionalAnalyticsTab from "./tabs/ProfessionalAnalyticsTab";
import { CalendarDays } from "lucide-react";

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

  // Render only the active tab content
  return (
    <div className="w-full h-full">
      {activeTab === "dashboard" && (
        <DashboardView 
          patientsData={patientsData}
          goalsData={goalsData}
          onAddPatient={() => setShowAddPatientModal(true)}
          onAddGoal={() => handlePatientSelect(patientsData[0]?.id || 0)}
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
      
      {activeTab === "calendar" && (
        <div className="p-6 flex flex-col items-center justify-center h-[calc(100vh-64px)]">
          <div className="bg-white rounded-lg shadow-sm p-8 max-w-lg w-full text-center">
            <CalendarDays className="h-16 w-16 text-clinic-yellow mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Agenda Profissional</h2>
            <p className="text-gray-600 mb-4">
              Gerencie seus compromissos e consultas nesta área.
            </p>
            <p className="text-sm text-gray-500">
              Esta funcionalidade será implementada em breve.
            </p>
          </div>
        </div>
      )}
      
      {activeTab === "settings" && <SettingsView />}
    </div>
  );
};

export default ProfessionalDashboardContent;
