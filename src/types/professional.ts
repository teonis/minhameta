
export type PatientType = {
  id: number;
  name: string;
  email: string;
  phone: string;
  lastActivity: string;
  totalGoals: number;
  completedGoals: number;
  diaryEntries: {
    id: number;
    date: string;
    mood: string;
    content: string;
  }[];
};

export type GoalType = {
  id: number;
  patientId: number;
  patientName: string;
  title: string;
  status: string;
  dueDate: string;
  priority: string;
  description: string;
};

export type AIAssistantContextType = {
  patientId?: number;
  patientName?: string;
  patientGoals?: GoalType[];
};

export type ProfessionalDashboardContextType = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  showAddPatientModal: boolean;
  setShowAddPatientModal: (show: boolean) => void;
  showAddGoalModal: boolean;
  setShowAddGoalModal: (show: boolean) => void;
  showAIAssistantModal: boolean;
  setShowAIAssistantModal: (show: boolean) => void;
  selectedPatient: number | null;
  setSelectedPatient: (id: number | null) => void;
  selectedPatients: number[];
  setSelectedPatients: (ids: number[]) => void;
  isGroupGoal: boolean;
  setIsGroupGoal: (isGroup: boolean) => void;
  viewingPatientDetails: boolean;
  setViewingPatientDetails: (viewing: boolean) => void;
  aiAssistantContext: AIAssistantContextType;
  setAiAssistantContext: (context: AIAssistantContextType) => void;
  patientsData: PatientType[];
  goalsData: GoalType[];
  goalTemplates: Record<string, { title: string; description: string }[]>;
  handleAddPatient: () => void;
  handleAddGoal: () => void;
  handleTogglePatientSelection: (patientId: number) => void;
  handlePatientSelect: (patientId: number) => void;
  handleOpenGroupGoalModal: () => void;
  handleViewPatientDetails: (patientId: number) => void;
  handleBackToPatientsList: () => void;
  handleOpenAIAssistant: (patientId?: number, patientName?: string, patientGoals?: GoalType[]) => void;
  currentPatient: PatientType | null;
  patientGoals: GoalType[];
};
