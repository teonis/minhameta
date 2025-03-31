
import { useState } from "react";
import { AIAssistantContextType, GoalType, PatientType } from "../types/professional";
import { patientsData, goalsData } from "../data/professionalMockData";

export const useProfessionalDashboardState = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  const [showAddGoalModal, setShowAddGoalModal] = useState(false);
  const [showAIAssistantModal, setShowAIAssistantModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<number | null>(null);
  const [selectedPatients, setSelectedPatients] = useState<number[]>([]);
  const [isGroupGoal, setIsGroupGoal] = useState(false);
  const [viewingPatientDetails, setViewingPatientDetails] = useState(false);
  const [aiAssistantContext, setAiAssistantContext] = useState<AIAssistantContextType>({});
  
  const handleAddPatient = () => {
    setShowAddPatientModal(false);
  };
  
  const handleAddGoal = () => {
    setShowAddGoalModal(false);
    setSelectedPatients([]);
    setIsGroupGoal(false);
  };
  
  const handleTogglePatientSelection = (patientId: number) => {
    setSelectedPatients(prev => {
      if (prev.includes(patientId)) {
        return prev.filter(id => id !== patientId);
      } else {
        return [...prev, patientId];
      }
    });
  };
  
  const handlePatientSelect = (patientId: number) => {
    setSelectedPatient(patientId);
    setSelectedPatients([patientId]);
    setIsGroupGoal(false);
    setShowAddGoalModal(true);
  };

  const handleOpenGroupGoalModal = () => {
    setSelectedPatient(null);
    setIsGroupGoal(true);
    setShowAddGoalModal(true);
  };

  const handleViewPatientDetails = (patientId: number) => {
    setSelectedPatient(patientId);
    setViewingPatientDetails(true);
  };

  const handleBackToPatientsList = () => {
    setViewingPatientDetails(false);
    setSelectedPatient(null);
  };

  const handleOpenAIAssistant = (patientId?: number, patientName?: string, patientGoals?: GoalType[]) => {
    setAiAssistantContext({
      patientId,
      patientName,
      patientGoals
    });
    setShowAIAssistantModal(true);
  };

  const currentPatient = selectedPatient ? patientsData.find(p => p.id === selectedPatient) || null : null;
  const patientGoals = selectedPatient ? goalsData.filter(g => g.patientId === selectedPatient) : [];
  
  return {
    activeTab,
    setActiveTab,
    showAddPatientModal,
    setShowAddPatientModal,
    showAddGoalModal,
    setShowAddGoalModal,
    showAIAssistantModal,
    setShowAIAssistantModal,
    selectedPatient,
    setSelectedPatient,
    selectedPatients,
    setSelectedPatients,
    isGroupGoal,
    setIsGroupGoal,
    viewingPatientDetails,
    setViewingPatientDetails,
    aiAssistantContext,
    setAiAssistantContext,
    patientsData,
    goalsData,
    handleAddPatient,
    handleAddGoal,
    handleTogglePatientSelection,
    handlePatientSelect,
    handleOpenGroupGoalModal,
    handleViewPatientDetails,
    handleBackToPatientsList,
    handleOpenAIAssistant,
    currentPatient,
    patientGoals
  };
};
