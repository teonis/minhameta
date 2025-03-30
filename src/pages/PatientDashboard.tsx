
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { 
  LogOut, 
  User, 
  Settings, 
  Calendar, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Camera,
  Plus,
  Edit,
  FileText,
  Send
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import ComunidadeMeta from "@/components/social/ComunidadeMeta";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const [diaryContent, setDiaryContent] = useState("");
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
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

  const handleDiarySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!diaryContent.trim() || !selectedMood) {
      toast({
        title: "Erro ao salvar",
        description: "Por favor, escreva como você está se sentindo e selecione um humor.",
        variant: "destructive"
      });
      return;
    }

    const newEntry = {
      id: diaryEntries.length + 1,
      date: new Date().toLocaleDateString('pt-BR'),
      content: diaryContent,
      mood: selectedMood
    };

    setDiaryEntries([newEntry, ...diaryEntries]);
    setDiaryContent("");
    setSelectedMood(null);

    toast({
      title: "Diário atualizado",
      description: "Seu registro foi adicionado com sucesso ao diário.",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <aside className="bg-secondary text-white w-full md:w-20 lg:w-64 md:flex md:flex-col md:min-h-screen">
        <div className="p-4 flex items-center justify-center md:justify-start">
          <div className="bg-clinic-yellow p-2 rounded-md">
            <span className="font-bold text-clinic-black text-xl">MR</span>
          </div>
          <span className="font-bold text-xl hidden lg:block ml-2">Minha Meta</span>
        </div>
        
        {isMobile ? (
          <nav className="flex justify-around p-2 border-t border-secondary-foreground/20">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex flex-col items-center p-2 ${activeTab === "dashboard" ? "text-clinic-yellow" : "text-white/80"}`}
            >
              <User className="h-5 w-5" />
              <span className="text-xs mt-1">Dashboard</span>
            </button>
            <button
              onClick={() => setActiveTab("goals")}
              className={`flex flex-col items-center p-2 ${activeTab === "goals" ? "text-clinic-yellow" : "text-white/80"}`}
            >
              <CheckCircle className="h-5 w-5" />
              <span className="text-xs mt-1">Metas</span>
            </button>
            <button
              onClick={() => setActiveTab("diary")}
              className={`flex flex-col items-center p-2 ${activeTab === "diary" ? "text-clinic-yellow" : "text-white/80"}`}
            >
              <FileText className="h-5 w-5" />
              <span className="text-xs mt-1">Diário</span>
            </button>
            <button
              onClick={() => setActiveTab("achievements")}
              className={`flex flex-col items-center p-2 ${activeTab === "achievements" ? "text-clinic-yellow" : "text-white/80"}`}
            >
              <Calendar className="h-5 w-5" />
              <span className="text-xs mt-1">Conquistas</span>
            </button>
          </nav>
        ) : (
          <nav className="flex-grow py-8">
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className={`w-full flex items-center px-4 py-3 ${
                    activeTab === "dashboard"
                      ? "bg-secondary-foreground/10 border-l-4 border-clinic-yellow"
                      : "hover:bg-secondary-foreground/5"
                  }`}
                >
                  <User className="h-5 w-5 md:mr-3" />
                  <span className="hidden lg:inline">Dashboard</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("goals")}
                  className={`w-full flex items-center px-4 py-3 ${
                    activeTab === "goals"
                      ? "bg-secondary-foreground/10 border-l-4 border-clinic-yellow"
                      : "hover:bg-secondary-foreground/5"
                  }`}
                >
                  <CheckCircle className="h-5 w-5 md:mr-3" />
                  <span className="hidden lg:inline">Minhas Metas</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("diary")}
                  className={`w-full flex items-center px-4 py-3 ${
                    activeTab === "diary"
                      ? "bg-secondary-foreground/10 border-l-4 border-clinic-yellow"
                      : "hover:bg-secondary-foreground/5"
                  }`}
                >
                  <FileText className="h-5 w-5 md:mr-3" />
                  <span className="hidden lg:inline">Meu Diário</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("achievements")}
                  className={`w-full flex items-center px-4 py-3 ${
                    activeTab === "achievements"
                      ? "bg-secondary-foreground/10 border-l-4 border-clinic-yellow"
                      : "hover:bg-secondary-foreground/5"
                  }`}
                >
                  <Calendar className="h-5 w-5 md:mr-3" />
                  <span className="hidden lg:inline">Conquistas</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`w-full flex items-center px-4 py-3 ${
                    activeTab === "settings"
                      ? "bg-secondary-foreground/10 border-l-4 border-clinic-yellow"
                      : "hover:bg-secondary-foreground/5"
                  }`}
                >
                  <Settings className="h-5 w-5 md:mr-3" />
                  <span className="hidden lg:inline">Configurações</span>
                </button>
              </li>
            </ul>
          </nav>
        )}
        
        {!isMobile && (
          <div className="p-4">
            <Link
              to="/login"
              className="flex items-center justify-center lg:justify-start text-white/80 hover:text-white"
            >
              <LogOut className="h-5 w-5 lg:mr-3" />
              <span className="hidden lg:inline">Sair</span>
            </Link>
          </div>
        )}
      </aside>
      
      <div className="flex-grow bg-gray-50 overflow-y-auto w-full">
        <header className="bg-white shadow-sm p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-lg md:text-xl font-bold">
              {activeTab === "dashboard" && "Dashboard do Paciente"}
              {activeTab === "goals" && "Minhas Metas"}
              {activeTab === "diary" && "Meu Diário"}
              {activeTab === "achievements" && "Minhas Conquistas"}
              {activeTab === "settings" && "Configurações"}
            </h1>
            
            <div className="flex items-center">
              <div className="mr-2 md:mr-4 text-right hidden sm:block">
                <p className="font-medium text-sm md:text-base">{patientData.name}</p>
                <p className="text-xs md:text-sm text-gray-600">Paciente</p>
              </div>
              <div 
                className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-clinic-yellow flex items-center justify-center overflow-hidden"
                onClick={triggerFileInput}
              >
                {profileImage ? (
                  <img src={profileImage} alt="Perfil" className="h-full w-full object-cover" />
                ) : (
                  <span className="font-bold text-black text-sm md:text-base">MS</span>
                )}
              </div>
            </div>
          </div>
        </header>
        
        {activeTab === "dashboard" && (
          <div className="p-3 md:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 mb-4 md:mb-8">
              <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-bold mb-1 md:mb-2">Metas Ativas</h2>
                <p className="text-2xl md:text-3xl font-bold">{goalsData.filter(g => g.status !== "completed").length}</p>
                <p className="text-xs md:text-sm text-gray-600">Total de metas em andamento</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-bold mb-1 md:mb-2">Metas Concluídas</h2>
                <p className="text-2xl md:text-3xl font-bold">{goalsData.filter(g => g.status === "completed").length}</p>
                <p className="text-xs md:text-sm text-gray-600">Total de metas finalizadas</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 sm:col-span-2 md:col-span-1">
                <h2 className="text-lg md:text-xl font-bold mb-1 md:mb-2">Conquistas</h2>
                <p className="text-2xl md:text-3xl font-bold">{achievementsData.length}</p>
                <p className="text-xs md:text-sm text-gray-600">Total de conquistas obtidas</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-6">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-4 md:mb-6">
                  <h2 className="text-lg md:text-xl font-bold mb-2 md:mb-4">Metas Recentes</h2>
                  
                  <div className="space-y-3 md:space-y-4">
                    {goalsData.slice(0, 3).map((goal) => (
                      <div key={goal.id} className="border-l-4 border-clinic-yellow p-3 md:p-4 bg-gray-50 rounded-r-lg">
                        <div className="flex justify-between items-start flex-col sm:flex-row gap-2 sm:gap-0">
                          <div>
                            <h3 className="font-bold text-sm md:text-base">{goal.title}</h3>
                            <p className="text-xs md:text-sm text-gray-600 mt-1">{goal.description}</p>
                            <p className="text-xs text-gray-500 mt-1 md:mt-2">Profissional: {goal.professional}</p>
                          </div>
                          {goal.status === "completed" ? (
                            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 flex items-center whitespace-nowrap">
                              <CheckCircle className="h-3 w-3 mr-1" /> Concluída
                            </span>
                          ) : (
                            <button
                              onClick={() => {
                                setSelectedGoal(goal.id);
                                setShowEvidenceModal(true);
                              }}
                              className="px-2 py-1 text-xs bg-clinic-yellow text-black rounded-md hover:bg-clinic-yellow/90 whitespace-nowrap"
                            >
                              Registrar Progresso
                            </button>
                          )}
                        </div>
                        <div className="mt-2 md:mt-3">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Progresso</span>
                            <span>{goal.progress}%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-clinic-yellow"
                              style={{ width: `${goal.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-3 md:mt-4 text-center">
                    <button
                      onClick={() => setActiveTab("goals")}
                      className="text-xs md:text-sm text-blue-600 hover:underline"
                    >
                      Ver Todas as Metas
                    </button>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
                  <div className="flex justify-between items-center mb-3 md:mb-4">
                    <h2 className="text-lg md:text-xl font-bold">Meu Perfil</h2>
                    <button 
                      className="text-gray-500 hover:text-gray-700"
                      onClick={triggerFileInput}
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="relative mb-3 md:mb-4">
                      <div className="h-16 w-16 md:h-24 md:w-24 rounded-full bg-gray-200 overflow-hidden">
                        {profileImage ? (
                          <img 
                            src={profileImage} 
                            alt="Foto de perfil" 
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center bg-clinic-yellow">
                            <span className="text-xl md:text-2xl font-bold text-black">
                              {patientData.name.split(" ").map(n => n[0]).join("")}
                            </span>
                          </div>
                        )}
                      </div>
                      <button 
                        className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md border border-gray-200"
                        onClick={triggerFileInput}
                      >
                        <Camera className="h-3 w-3 md:h-4 md:w-4" />
                      </button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleProfilePhotoChange}
                      />
                    </div>
                    
                    <h3 className="font-bold text-base md:text-lg">{patientData.name}</h3>
                    <p className="text-xs md:text-sm text-gray-600">{patientData.email}</p>
                    
                    <div className="w-full mt-3 md:mt-4 space-y-2 md:space-y-3">
                      <div className="flex justify-between text-xs md:text-sm">
                        <span className="text-gray-600">Membro desde:</span>
                        <span>{patientData.joinedDate}</span>
                      </div>
                      <div className="flex justify-between text-xs md:text-sm">
                        <span className="text-gray-600">Total de metas:</span>
                        <span>{goalsData.length}</span>
                      </div>
                      <div className="flex justify-between text-xs md:text-sm">
                        <span className="text-gray-600">Metas concluídas:</span>
                        <span>{goalsData.filter(g => g.status === "completed").length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 md:mt-6">
              <ComunidadeMeta />
            </div>
          </div>
        )}
        
        {activeTab === "goals" && (
          <div className="p-3 md:p-6">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-3 md:p-4 border-b">
                <h2 className="text-lg md:text-xl font-bold">Todas as Minhas Metas</h2>
              </div>
              
              <div className="p-3 md:p-4">
                <div className="space-y-4 md:space-y-6">
                  {goalsData.map((goal) => (
                    <div 
                      key={goal.id}
                      className={`border-l-4 p-3 md:p-4 rounded-r-lg bg-gray-50 ${
                        goal.status === "completed" 
                          ? "border-green-500" 
                          : goal.status === "in-progress"
                            ? "border-clinic-yellow"
                            : "border-gray-300"
                      }`}
                    >
                      <div className="flex justify-between items-start flex-col sm:flex-row gap-2 sm:gap-0">
                        <div>
                          <h3 className="font-bold text-base md:text-lg">{goal.title}</h3>
                          <p className="text-xs md:text-sm text-gray-600 mt-1">{goal.description}</p>
                        </div>
                        
                        <div className="self-start">
                          {goal.status === "completed" ? (
                            <span className="px-2 py-1 text-xs md:text-sm rounded-full bg-green-100 text-green-800 flex items-center whitespace-nowrap">
                              <CheckCircle className="h-3 w-3 md:h-4 md:w-4 mr-1" /> Concluída
                            </span>
                          ) : goal.status === "in-progress" ? (
                            <span className="px-2 py-1 text-xs md:text-sm rounded-full bg-blue-100 text-blue-800 flex items-center whitespace-nowrap">
                              <Clock className="h-3 w-3 md:h-4 md:w-4 mr-1" /> Em Progresso
                            </span>
                          ) : (
                            <span className="px-2 py-1 text-xs md:text-sm rounded-full bg-yellow-100 text-yellow-800 flex items-center whitespace-nowrap">
                              <AlertCircle className="h-3 w-3 md:h-4 md:w-4 mr-1" /> Pendente
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-3 md:mt-4 grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 text-xs md:text-sm">
                        <div>
                          <span className="text-gray-600">Profissional:</span>
                          <span className="ml-1 md:ml-2">{goal.professional}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Data limite:</span>
                          <span className="ml-1 md:ml-2">{goal.dueDate}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Prioridade:</span>
                          <span className={`ml-1 md:ml-2 px-2 py-0.5 rounded-full text-xs ${
                            goal.priority === "alta" 
                              ? "bg-red-100 text-red-800" 
                              : goal.priority === "média"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                          }`}>
                            {goal.priority.charAt(0).toUpperCase() + goal.priority.slice(1)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-3 md:mt-4">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Progresso</span>
                          <span>{goal.progress}%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${goal.status === "completed" ? "bg-green-500" : "bg-clinic-yellow"}`}
                            style={{ width: `${goal.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      {goal.status !== "completed" && (
                        <div className="mt-3 md:mt-4">
                          <button
                            onClick={() => {
                              setSelectedGoal(goal.id);
                              setShowEvidenceModal(true);
                            }}
                            className="px-3 md:px-4 py-1 md:py-2 bg-clinic-yellow text-black rounded-md hover:bg-clinic-yellow/90 text-xs md:text-sm"
                          >
                            Registrar Progresso
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === "diary" && (
          <div className="p-3 md:p-6">
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-4 md:mb-6">
              <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Como você está se sentindo hoje?</h2>
              
              <form onSubmit={handleDiarySubmit}>
                <div className="mb-3 md:mb-4">
                  <label htmlFor="diaryContent" className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                    Registre seus pensamentos, sentimentos e progresso
                  </label>
                  <Textarea
                    id="diaryContent"
                    placeholder="Hoje eu me sinto..."
                    className="min-h-[80px] md:min-h-[120px]"
                    value={diaryContent}
                    onChange={(e) => setDiaryContent(e.target.value)}
                  />
                </div>
                
                <div className="mb-3 md:mb-4">
                  <p className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">Como está seu humor?</p>
                  <div className="flex space-x-3 md:space-x-4">
                    <button
                      type="button"
                      onClick={() => setSelectedMood("happy")}
                      className={`p-2 md:p-3 rounded-full ${
                        selectedMood === "happy" ? "bg-green-100 ring-2 ring-green-500" : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      <span className="text-xl md:text-2xl">😊</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedMood("neutral")}
                      className={`p-2 md:p-3 rounded-full ${
                        selectedMood === "neutral" ? "bg-blue-100 ring-2 ring-blue-500" : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      <span className="text-xl md:text-2xl">😐</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedMood("sad")}
                      className={`p-2 md:p-3 rounded-full ${
                        selectedMood === "sad" ? "bg-red-100 ring-2 ring-red-500" : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      <span className="text-xl md:text-2xl">😔</span>
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center px-3 md:px-4 py-1 md:py-2 bg-clinic-yellow text-black rounded-md hover:bg-clinic-yellow/90 text-xs md:text-sm"
                  >
                    <Send className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                    Salvar no Diário
                  </button>
                </div>
              </form>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-3 md:p-4 border-b">
                <h2 className="text-lg md:text-xl font-bold">Histórico do Diário</h2>
                <p className="text-xs md:text-sm text-gray-600">Seus registros anteriores</p>
              </div>
              
              <div className="p-3 md:p-4">
                <div className="space-y-4 md:space-y-6">
                  {diaryEntries.map((entry) => (
                    <div key={entry.id} className="bg-gray-50 rounded-lg p-3 md:p-4 border-l-4 border-clinic-yellow">
                      <div className="flex justify-between items-start">
                        <div className="flex-grow">
                          <div className="flex items-center mb-1 md:mb-2">
                            <span className="text-xl md:text-2xl mr-2">
                              {entry.mood === "happy" && "😊"}
                              {entry.mood === "neutral" && "😐"}
                              {entry.mood === "sad" && "😔"}
                            </span>
                            <h3 className="font-bold text-sm md:text-base">{entry.date}</h3>
                          </div>
                          <p className="text-xs md:text-sm text-gray-700">{entry.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
          <div className="p-3 md:p-6">
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 max-w-2xl mx-auto">
              <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6">Meu Perfil</h2>
              
              <div className="flex flex-col sm:flex-row sm:items-center mb-4 md:mb-6">
                <div className="relative mb-3 sm:mb-0 sm:mr-4 md:mr-6 mx-auto sm:mx-0">
                  <div className="h-20 w-20 md:h-24 md:w-24 rounded-full bg-gray-200 overflow-hidden">
                    {profileImage ? (
                      <img 
                        src={profileImage} 
                        alt="Foto de perfil" 
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-clinic-yellow">
                        <span className="text-xl md:text-2xl font-bold text-black">
                          {patientData.name.split(" ").map(n => n[0]).join("")}
                        </span>
                      </div>
                    )}
                  </div>
                  <button 
                    className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md border border-gray-200"
                    onClick={triggerFileInput}
                  >
                    <Camera className="h-3 w-3 md:h-4 md:w-4" />
                  </button>
                </div>
                
                <div className="text-center sm:text-left">
                  <h3 className="font-bold text-base md:text-lg">{patientData.name}</h3>
                  <p className="text-xs md:text-sm text-gray-600">{patientData.email}</p>
                  <button 
                    className="mt-1 md:mt-2 text-xs md:text-sm text-blue-600 hover:underline"
                    onClick={triggerFileInput}
                  >
                    Alterar foto de perfil
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleProfilePhotoChange}
                  />
                </div>
              </div>
              
              <div className="space-y-4 md:space-y-6">
                <div>
                  <label htmlFor="name" className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-3 md:px-4 py-1.5 md:py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-clinic-yellow text-sm md:text-base"
                    defaultValue={patientData.name}
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 md:px-4 py-1.5 md:py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-clinic-yellow text-sm md:text-base"
                    defaultValue={patientData.email}
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                    Senha
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="w-full px-3 md:px-4 py-1.5 md:py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-clinic-yellow text-sm md:text-base"
                    placeholder="••••••••"
                  />
                  <p className="text-xs text-gray-500 mt-1">Deixe em branco para manter a senha atual</p>
                </div>
                
                <div>
                  <label htmlFor="passwordConfirm" className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                    Confirmar Senha
                  </label>
                  <input
                    type="password"
                    id="passwordConfirm"
                    className="w-full px-3 md:px-4 py-1.5 md:py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-clinic-yellow text-sm md:text-base"
                    placeholder="••••••••"
                  />
                </div>
                
                <div>
                  <label htmlFor="notifications" className="flex items-center">
                    <input
                      type="checkbox"
                      id="notifications"
                      className="h-4 w-4 text-clinic-yellow focus:ring-clinic-yellow border-gray-300 rounded mr-2"
                      defaultChecked
                    />
                    <span className="text-xs md:text-sm text-gray-700">Receber notificações por email</span>
                  </label>
                </div>
                
                <div>
                  <button className="bg-clinic-yellow text-black px-3 md:px-4 py-1.5 md:py-2 rounded-md hover:bg-clinic-yellow/90 text-sm md:text-base">
                    Salvar Alterações
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {isMobile && activeTab !== "settings" && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 flex justify-around z-10">
            <Link to="/" className="flex flex-col items-center justify-center text-gray-700 hover:text-clinic-yellow">
              <User className="h-5 w-5" />
              <span className="text-xs mt-1">Início</span>
            </Link>
            
            <Link to="/comunidade" className="flex flex-col items-center justify-center text-gray-700 hover:text-clinic-yellow">
              <Users className="h-5 w-5" />
              <span className="text-xs mt-1">Comunidade</span>
            </Link>
            
            <button onClick={() => setActiveTab("diary")} className="flex flex-col items-center justify-center text-gray-700 hover:text-clinic-yellow">
              <FileText className="h-5 w-5" />
              <span className="text-xs mt-1">Diário</span>
            </button>
            
            <button onClick={() => setActiveTab("settings")} className="flex flex-col items-center justify-center text-gray-700 hover:text-clinic-yellow">
              <Settings className="h-5 w-5" />
              <span className="text-xs mt-1">Perfil</span>
            </button>
          </div>
        )}
        
        {isMobile && activeTab !== "settings" && <div className="h-16"></div>}
      </div>
      
      {showEvidenceModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 w-full max-w-md">
            <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Registrar Progresso</h2>
            
            <form onSubmit={(e) => { e.preventDefault(); handleAddEvidence(); }}>
              <div className="mb-3 md:mb-4">
                <label htmlFor="progressDescription" className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                  Descrição do Progresso
                </label>
                <textarea
                  id="progressDescription"
                  className="w-full px-3 md:px-4 py-1.5 md:py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-clinic-yellow text-sm md:text-base"
                  placeholder="Descreva seu progresso..."
                  rows={3}
                  required
                />
              </div>
              
              <div className="mb-3 md:mb-4">
                <label htmlFor="photoEvidence" className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                  Foto da Evidência (opcional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-4 md:p-6 text-center">
                  <div className="flex flex-col items-center">
                    <Camera className="h-6 w-6 md:h-8 md:w-8 text-gray-400 mb-2" />
                    <p className="text-xs md:text-sm text-gray-500">Arraste uma imagem ou clique para selecionar</p>
                    <input
                      type="file"
                      id="photoEvidence"
                      className="hidden"
                      accept="image/*"
                    />
                    <button
                      type="button"
                      onClick={() => document.getElementById("photoEvidence")?.click()}
                      className="mt-2 text-xs md:text-sm text-blue-600 hover:underline"
                    >
                      Selecionar arquivo
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="mb-3 md:mb-4">
                <label htmlFor="progressPercentage" className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                  Porcentagem de Conclusão
                </label>
                <div className="flex items-center">
                  <input
                    type="range"
                    id="progressPercentage"
                    min="0"
                    max="100"
                    step="10"
                    defaultValue="50"
                    className="w-full mr-2"
                  />
                  <span id="progressValue" className="text-xs md:text-sm">50%</span>
                </div>
              </div>
              
              <div className="flex justify-end gap-2 md:gap-3">
                <button
                  type="button"
                  className="px-3 md:px-4 py-1.5 md:py-2 border rounded-md text-xs md:text-sm"
                  onClick={() => setShowEvidenceModal(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-clinic-yellow text-black px-3 md:px-4 py-1.5 md:py-2 rounded-md hover:bg-clinic-yellow/90 text-xs md:text-sm"
                >
                  Salvar Progresso
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDashboard;
