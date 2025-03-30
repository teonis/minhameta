
import { createContext, useContext, useState, ReactNode } from "react";

type PatientType = {
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

type GoalType = {
  id: number;
  patientId: number;
  patientName: string;
  title: string;
  status: string;
  dueDate: string;
  priority: string;
  description: string;
};

type AIAssistantContextType = {
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

export const ProfessionalDashboardContext = createContext<ProfessionalDashboardContextType | undefined>(undefined);

// Simulated data - would be fetched from backend in real app
const patientsData = [
  { 
    id: 1, 
    name: "Ana Silva", 
    email: "ana@email.com", 
    phone: "(11) 98765-4321",
    lastActivity: "2 dias atrás", 
    totalGoals: 8, 
    completedGoals: 5,
    diaryEntries: [
      { id: 1, date: "10/11/2023", mood: "Bem", content: "Hoje foi um bom dia. Consegui realizar todos os exercícios propostos e me senti mais disposta." },
      { id: 2, date: "09/11/2023", mood: "Cansada", content: "Tive dificuldade para dormir ontem à noite, o que afetou minha energia hoje. Mesmo assim, fiz a caminhada recomendada." }
    ]
  },
  { 
    id: 2, 
    name: "Carlos Oliveira", 
    email: "carlos@email.com", 
    phone: "(11) 91234-5678",
    lastActivity: "Hoje", 
    totalGoals: 6, 
    completedGoals: 4,
    diaryEntries: [
      { id: 1, date: "11/11/2023", mood: "Motivado", content: "Consegui completar duas metas hoje! Estou me sentindo muito bem com o progresso." }
    ]
  },
  { 
    id: 3, 
    name: "Mariana Santos", 
    email: "mariana@email.com", 
    phone: "(11) 99876-5432",
    lastActivity: "5 dias atrás", 
    totalGoals: 10, 
    completedGoals: 3,
    diaryEntries: [
      { id: 1, date: "06/11/2023", mood: "Ansiosa", content: "Estou sentindo um pouco de ansiedade hoje. Tentei fazer os exercícios de respiração, mas tive dificuldade de concentração." }
    ]
  },
  { 
    id: 4, 
    name: "Bruno Costa", 
    email: "bruno@email.com", 
    phone: "(11) 95678-1234",
    lastActivity: "1 semana atrás", 
    totalGoals: 7, 
    completedGoals: 7,
    diaryEntries: [
      { id: 1, date: "04/11/2023", mood: "Realizado", content: "Completei todas as minhas metas! Estou muito feliz com meu progresso até agora." }
    ]
  },
];

const goalsData = [
  { 
    id: 1, 
    patientId: 1, 
    patientName: "Ana Silva", 
    title: "Exercícios de Respiração", 
    status: "completed",
    dueDate: "10/11/2023", 
    priority: "alta", 
    description: "Realizar exercícios de respiração diafragmática por 10 minutos diariamente."
  },
  { 
    id: 2, 
    patientId: 1, 
    patientName: "Ana Silva", 
    title: "Caminhada diária", 
    status: "in-progress",
    dueDate: "15/11/2023", 
    priority: "média", 
    description: "Caminhar por pelo menos 20 minutos todos os dias."
  },
  { 
    id: 3, 
    patientId: 2, 
    patientName: "Carlos Oliveira", 
    title: "Prática de Mindfulness", 
    status: "completed",
    dueDate: "12/11/2023", 
    priority: "média", 
    description: "Realizar 15 minutos de prática de atenção plena todas as manhãs."
  },
  { 
    id: 4, 
    patientId: 3, 
    patientName: "Mariana Santos", 
    title: "Alongamento Matinal", 
    status: "pending",
    dueDate: "18/11/2023", 
    priority: "baixa", 
    description: "Fazer uma sequência de alongamentos por 10 minutos ao acordar."
  },
];

const goalTemplates = {
  "Exercício Físico": [
    { title: "Caminhada Diária", description: "Caminhar por pelo menos 30 minutos todos os dias." },
    { title: "Treino de Força", description: "Realizar exercícios de força 3 vezes por semana." },
    { title: "Alongamento", description: "Fazer uma rotina de alongamento por 15 minutos diariamente." }
  ],
  "Lifestyle": [
    { title: "Meditação", description: "Praticar meditação por 10 minutos todas as manhãs." },
    { title: "Leitura", description: "Ler um livro por 20 minutos antes de dormir." },
    { title: "Organização", description: "Dedicar 15 minutos por dia para organizar o ambiente." }
  ],
  "Finanças": [
    { title: "Controle de Gastos", description: "Registrar todos os gastos diários em um aplicativo." },
    { title: "Economias", description: "Separar 10% da renda mensal para poupança." }
  ],
  "Nutrição": [
    { title: "Hidratação", description: "Beber pelo menos 2 litros de água por dia." },
    { title: "Frutas e Vegetais", description: "Consumir 5 porções de frutas e vegetais diariamente." },
    { title: "Planejamento de Refeições", description: "Planejar as refeições da semana com antecedência." }
  ],
  "Saúde Mental": [
    { title: "Diário", description: "Escrever 3 coisas positivas que aconteceram no dia." },
    { title: "Limites", description: "Praticar dizer 'não' quando necessário." },
    { title: "Desconexão", description: "Passar 1 hora por dia sem dispositivos eletrônicos." }
  ]
};

export const ProfessionalDashboardProvider = ({ children }: { children: ReactNode }) => {
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
  
  return (
    <ProfessionalDashboardContext.Provider value={{
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
      goalTemplates,
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
    }}>
      {children}
    </ProfessionalDashboardContext.Provider>
  );
};

export const useProfessionalDashboard = () => {
  const context = useContext(ProfessionalDashboardContext);
  if (context === undefined) {
    throw new Error('useProfessionalDashboard must be used within a ProfessionalDashboardProvider');
  }
  return context;
};
