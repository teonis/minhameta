
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

// Components
import PatientSidebar from "@/components/patient/PatientSidebar";
import PatientHeader from "@/components/patient/PatientHeader";
import PatientMobileFooter from "@/components/patient/PatientMobileFooter";
import DashboardTab from "@/components/patient/tabs/DashboardTab";
import GoalsTab from "@/components/patient/tabs/GoalsTab";
import DiaryTab from "@/components/patient/tabs/DiaryTab";
import SettingsTab from "@/components/patient/tabs/SettingsTab";
import EvidenceModal from "@/components/patient/EvidenceModal";
import PatientAchievementsTab from "@/components/achievements/PatientAchievementsTab";

// Mock data
const patientData = {
  id: 1,
  name: "Marcos Silva",
  email: "marcos@email.com",
  profilePicture: null,
  joinedDate: "10/05/2023"
};

const goalsData = [
  { 
    id: 1, 
    title: "Exercícios de Respiração", 
    status: "completed",
    dueDate: "10/11/2023", 
    priority: "alta", 
    description: "Realizar exercícios de respiração diafragmática por 10 minutos diariamente.",
    progress: 100,
    professional: "Dra. Tay Rocha"
  },
  { 
    id: 2, 
    title: "Caminhada diária", 
    status: "in-progress",
    dueDate: "15/11/2023", 
    priority: "média", 
    description: "Caminhar por pelo menos 20 minutos todos os dias.",
    progress: 60,
    professional: "Dra. Tay Rocha"
  },
  { 
    id: 3, 
    title: "Prática de Mindfulness", 
    status: "pending",
    dueDate: "18/11/2023", 
    priority: "baixa",
    description: "Realizar 15 minutos de prática de atenção plena todas as manhãs.",
    progress: 0,
    professional: "Dr. Teonis Rocha"
  }
];

const achievementsData = [
  { id: 1, title: "Primeira Meta Concluída", date: "15/06/2023", description: "Parabéns por completar sua primeira meta!" },
  { id: 2, title: "7 Dias Consecutivos", date: "22/07/2023", description: "Você manteve atividades por 7 dias seguidos!" },
  { id: 3, title: "Meta de Alta Prioridade", date: "05/09/2023", description: "Completou com sucesso uma meta de alta prioridade." }
];

const diaryEntriesData = [
  {
    id: 1,
    date: "10/11/2023",
    content: "Hoje me senti mais disposto. Consegui realizar todos os exercícios recomendados pela Dra. Tay e tive menos dores nas costas.",
    mood: "happy"
  },
  {
    id: 2,
    date: "09/11/2023",
    content: "Dia difícil. Tive dores nas articulações e não consegui fazer a caminhada completa. Preciso conversar com o Dr. Teonis sobre ajustes na medicação.",
    mood: "sad"
  },
  {
    id: 3,
    date: "08/11/2023",
    content: "Dia neutro. Nem muitas dores, nem muita disposição. Fiz apenas metade dos exercícios recomendados.",
    mood: "neutral"
  }
];

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedGoal, setSelectedGoal] = useState<number | null>(null);
  const [showEvidenceModal, setShowEvidenceModal] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [diaryEntries, setDiaryEntries] = useState(diaryEntriesData);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();
  
  const { toast } = useToast();

  const handleAddEvidence = () => {
    toast({
      title: "Evidência adicionada",
      description: "Sua evidência foi registrada com sucesso.",
    });
    setShowEvidenceModal(false);
  };

  const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        toast({
          title: "Foto atualizada",
          description: "Sua foto de perfil foi atualizada com sucesso.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <PatientSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-grow bg-gray-50 overflow-y-auto w-full">
        <PatientHeader 
          patientData={patientData} 
          activeTab={activeTab} 
          profileImage={profileImage} 
          fileInputRef={fileInputRef}
          triggerFileInput={triggerFileInput}
        />
        
        {activeTab === "dashboard" && (
          <DashboardTab 
            goalsData={goalsData} 
            patientData={patientData} 
            profileImage={profileImage}
            achievementsData={achievementsData}
            setSelectedGoal={setSelectedGoal}
            setShowEvidenceModal={setShowEvidenceModal}
            setActiveTab={setActiveTab}
            triggerFileInput={triggerFileInput}
          />
        )}
        
        {activeTab === "goals" && (
          <GoalsTab 
            goalsData={goalsData} 
            setSelectedGoal={setSelectedGoal} 
            setShowEvidenceModal={setShowEvidenceModal} 
          />
        )}
        
        {activeTab === "diary" && (
          <DiaryTab 
            diaryEntries={diaryEntries} 
            setDiaryEntries={setDiaryEntries} 
          />
        )}
        
        {activeTab === "medals" && (
          <div className="p-3 md:p-6">
            <PatientAchievementsTab />
          </div>
        )}
        
        {activeTab === "achievements" && (
          <div className="p-3 md:p-6">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-3 md:p-4 border-b">
                <h2 className="text-lg md:text-xl font-bold">Minhas Conquistas</h2>
              </div>
              
              <div className="p-3 md:p-4">
                <div className="space-y-3 md:space-y-4">
                  {achievementsData.map((achievement) => (
                    <div key={achievement.id} className="bg-gray-50 rounded-lg p-3 md:p-4 border-l-4 border-clinic-yellow">
                      <div className="flex justify-between items-start flex-col sm:flex-row gap-2 sm:gap-0">
                        <div>
                          <h3 className="font-bold text-sm md:text-base">{achievement.title}</h3>
                          <p className="text-xs md:text-sm text-gray-600 mt-1">{achievement.description}</p>
                        </div>
                        <div className="text-xs md:text-sm text-gray-500 whitespace-nowrap">{achievement.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === "settings" && (
          <SettingsTab 
            patientData={patientData}
            profileImage={profileImage}
            triggerFileInput={triggerFileInput}
            fileInputRef={fileInputRef}
          />
        )}
        
        {isMobile && (
          <PatientMobileFooter activeTab={activeTab} setActiveTab={setActiveTab} />
        )}
      </div>
      
      {showEvidenceModal && (
        <EvidenceModal 
          onClose={() => setShowEvidenceModal(false)} 
          handleAddEvidence={handleAddEvidence} 
        />
      )}
    </div>
  );
};

export default PatientDashboard;
