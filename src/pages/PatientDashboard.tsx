
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  LogOut, 
  User, 
  Settings, 
  Check, 
  Clock, 
  AlertTriangle,
  Camera,
  Send
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Simulated data - would be fetched from backend in real app
const goalsData = [
  { 
    id: 1, 
    title: "Exercícios de Respiração", 
    status: "completed",
    dueDate: "10/11/2023", 
    priority: "alta", 
    description: "Realizar exercícios de respiração diafragmática por 10 minutos diariamente.",
    feedback: "Excelente progresso! Continue praticando diariamente para melhores resultados.",
    evidence: ["https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2"]
  },
  { 
    id: 2, 
    title: "Caminhada diária", 
    status: "in-progress",
    dueDate: "15/11/2023", 
    priority: "média", 
    description: "Caminhar por pelo menos 20 minutos todos os dias.",
    feedback: "",
    evidence: []
  },
  { 
    id: 3, 
    title: "Prática de Mindfulness", 
    status: "pending",
    dueDate: "18/11/2023", 
    priority: "baixa", 
    description: "Realizar 15 minutos de prática de atenção plena todas as manhãs.",
    feedback: "",
    evidence: []
  },
];

const progressData = [
  { week: "Semana 1", completed: 2, total: 3 },
  { week: "Semana 2", completed: 3, total: 3 },
  { week: "Semana 3", completed: 2, total: 4 },
  { week: "Semana 4", completed: 4, total: 5 },
];

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedGoal, setSelectedGoal] = useState<typeof goalsData[0] | null>(null);
  const [showEvidenceModal, setShowEvidenceModal] = useState(false);
  const [showGoalDetailsModal, setShowGoalDetailsModal] = useState(false);
  const [comment, setComment] = useState("");
  
  const { toast } = useToast();
  
  const handleAddEvidence = () => {
    toast({
      title: "Evidência adicionada",
      description: "Sua evidência foi enviada com sucesso.",
    });
    setShowEvidenceModal(false);
  };
  
  const handleMarkAsCompleted = (goalId: number) => {
    toast({
      title: "Meta concluída",
      description: "Parabéns por completar sua meta!",
    });
  };
  
  const handleGoalClick = (goal: typeof goalsData[0]) => {
    setSelectedGoal(goal);
    setShowGoalDetailsModal(true);
  };
  
  const handleEvidenceClick = (goal: typeof goalsData[0]) => {
    setSelectedGoal(goal);
    setShowEvidenceModal(true);
  };
  
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="bg-secondary text-white w-20 md:w-64 flex flex-col">
        <div className="p-4 flex items-center justify-center md:justify-start">
          <div className="bg-clinic-yellow p-2 rounded-md">
            <span className="font-bold text-clinic-black text-xl">MR</span>
          </div>
          <span className="font-bold text-xl hidden md:block ml-2">Minha Meta</span>
        </div>
        
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
                <span className="hidden md:inline">Minhas Metas</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("progress")}
                className={`w-full flex items-center px-4 py-3 ${
                  activeTab === "progress"
                    ? "bg-secondary-foreground/10 border-l-4 border-clinic-yellow"
                    : "hover:bg-secondary-foreground/5"
                }`}
              >
                <Check className="h-5 w-5 md:mr-3" />
                <span className="hidden md:inline">Meu Progresso</span>
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
                <span className="hidden md:inline">Configurações</span>
              </button>
            </li>
          </ul>
        </nav>
        
        <div className="p-4">
          <Link
            to="/login"
            className="flex items-center justify-center md:justify-start text-white/80 hover:text-white"
          >
            <LogOut className="h-5 w-5 md:mr-3" />
            <span className="hidden md:inline">Sair</span>
          </Link>
        </div>
      </aside>
      
      {/* Main Content */}
      <div className="flex-grow bg-gray-50 overflow-y-auto">
        {/* Header */}
        <header className="bg-white shadow-sm p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">
              {activeTab === "dashboard" && "Minhas Metas"}
              {activeTab === "progress" && "Meu Progresso"}
              {activeTab === "settings" && "Configurações"}
            </h1>
            
            <div className="flex items-center">
              <div className="mr-4 text-right hidden sm:block">
                <p className="font-medium">Ana Silva</p>
                <p className="text-sm text-gray-600">Paciente</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="font-bold text-gray-700">AS</span>
              </div>
            </div>
          </div>
        </header>
        
        {/* Dashboard Content */}
        {activeTab === "dashboard" && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-2">Total de Metas</h2>
                <p className="text-3xl font-bold">{goalsData.length}</p>
                <p className="text-sm text-gray-600">Metas atribuídas</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-2">Em Progresso</h2>
                <p className="text-3xl font-bold">{goalsData.filter(g => g.status === "in-progress").length}</p>
                <p className="text-sm text-gray-600">Metas em andamento</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-2">Concluídas</h2>
                <p className="text-3xl font-bold">{goalsData.filter(g => g.status === "completed").length}</p>
                <p className="text-sm text-gray-600">Metas finalizadas</p>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Minhas Metas</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {goalsData.map((goal) => (
                  <div key={goal.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <h3 
                        className="text-lg font-bold hover:text-clinic-yellow cursor-pointer"
                        onClick={() => handleGoalClick(goal)}
                      >
                        {goal.title}
                      </h3>
                      <div>
                        {goal.status === "completed" && (
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            <Check className="h-4 w-4 mr-1" /> Concluída
                          </span>
                        )}
                        {goal.status === "in-progress" && (
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            <Clock className="h-4 w-4 mr-1" /> Em Progresso
                          </span>
                        )}
                        {goal.status === "pending" && (
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            <AlertTriangle className="h-4 w-4 mr-1" /> Pendente
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-4">{goal.description}</p>
                    
                    <div className="flex justify-between items-center text-sm mb-4">
                      <div>
                        <span className="text-gray-600 mr-2">Prazo:</span>
                        <span className="font-medium">{goal.dueDate}</span>
                      </div>
                      <div>
                        {goal.priority === "alta" && (
                          <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-800">
                            Prioridade Alta
                          </span>
                        )}
                        {goal.priority === "média" && (
                          <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-800">
                            Prioridade Média
                          </span>
                        )}
                        {goal.priority === "baixa" && (
                          <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-800">
                            Prioridade Baixa
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {goal.feedback && (
                      <div className="bg-gray-50 p-3 rounded-md mb-4">
                        <p className="text-sm font-medium mb-1">Feedback do Profissional:</p>
                        <p className="text-sm text-gray-700">{goal.feedback}</p>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {goal.evidence.map((evidence, index) => (
                        <div key={index} className="h-16 w-16 rounded-md overflow-hidden">
                          <img 
                            src={evidence} 
                            alt="Evidência" 
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex gap-3">
                      {goal.status !== "completed" && (
                        <button
                          className="flex-1 bg-clinic-yellow text-black py-2 rounded-md hover:bg-clinic-yellow/90 flex items-center justify-center"
                          onClick={() => handleEvidenceClick(goal)}
                        >
                          <Camera className="h-4 w-4 mr-2" />
                          Adicionar Evidência
                        </button>
                      )}
                      
                      {goal.status === "in-progress" && (
                        <button
                          className="flex-1 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 flex items-center justify-center"
                          onClick={() => handleMarkAsCompleted(goal.id)}
                        >
                          <Check className="h-4 w-4 mr-2" />
                          Marcar como Concluída
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Progress Tab */}
        {activeTab === "progress" && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-6">Resumo de Progresso</h2>
                
                <div className="space-y-6">
                  {progressData.map((week, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{week.week}</span>
                        <span>{week.completed}/{week.total} concluídas</span>
                      </div>
                      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-clinic-yellow"
                          style={{ width: `${(week.completed / week.total) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-6">Estatísticas</h2>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-clinic-yellow">82%</div>
                    <div className="text-sm text-gray-600">Taxa de Conclusão</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-clinic-yellow">14</div>
                    <div className="text-sm text-gray-600">Total de Metas Concluídas</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-clinic-yellow">4</div>
                    <div className="text-sm text-gray-600">Semanas de Atividade</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-clinic-yellow">3.5</div>
                    <div className="text-sm text-gray-600">Metas Semanais em Média</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6 md:col-span-2">
                <h2 className="text-xl font-bold mb-6">Histórico de Atividades</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start border-l-4 border-green-500 pl-4 py-2">
                    <div className="mr-4">
                      <div className="text-sm text-gray-500">12/11/2023</div>
                    </div>
                    <div>
                      <div className="font-medium">Meta "Prática de Mindfulness" concluída</div>
                      <div className="text-sm text-gray-600">Você concluiu a meta e recebeu feedback positivo do profissional.</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start border-l-4 border-blue-500 pl-4 py-2">
                    <div className="mr-4">
                      <div className="text-sm text-gray-500">10/11/2023</div>
                    </div>
                    <div>
                      <div className="font-medium">Evidência adicionada para "Caminhada diária"</div>
                      <div className="text-sm text-gray-600">Você adicionou uma foto como evidência para sua meta.</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start border-l-4 border-yellow-500 pl-4 py-2">
                    <div className="mr-4">
                      <div className="text-sm text-gray-500">08/11/2023</div>
                    </div>
                    <div>
                      <div className="font-medium">Nova meta atribuída</div>
                      <div className="text-sm text-gray-600">O profissional atribuiu a meta "Exercícios de Respiração" para você.</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start border-l-4 border-green-500 pl-4 py-2">
                    <div className="mr-4">
                      <div className="text-sm text-gray-500">05/11/2023</div>
                    </div>
                    <div>
                      <div className="font-medium">Meta "Leitura Diária" concluída</div>
                      <div className="text-sm text-gray-600">Você concluiu a meta dentro do prazo estabelecido.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="p-6">
            <div className="bg-white rounded-lg shadow-sm p-6 max-w-2xl">
              <h2 className="text-xl font-bold mb-6">Perfil do Paciente</h2>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-clinic-yellow"
                    defaultValue="Ana Silva"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-clinic-yellow"
                    defaultValue="ana@email.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-clinic-yellow"
                    defaultValue="(00) 00000-0000"
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Nova Senha
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-clinic-yellow"
                    placeholder="Deixe em branco para manter a senha atual"
                  />
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirmar Nova Senha
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-clinic-yellow"
                    placeholder="Deixe em branco para manter a senha atual"
                  />
                </div>
                
                <div>
                  <label htmlFor="notifications" className="flex items-center">
                    <input
                      type="checkbox"
                      id="notifications"
                      className="mr-2"
                      defaultChecked
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Receber notificações por email
                    </span>
                  </label>
                </div>
                
                <div>
                  <button className="bg-clinic-yellow text-black px-4 py-2 rounded-md hover:bg-clinic-yellow/90">
                    Salvar Alterações
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Evidence Modal */}
      {showEvidenceModal && selectedGoal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              Adicionar Evidência: {selectedGoal.title}
            </h2>
            
            <form onSubmit={(e) => { e.preventDefault(); handleAddEvidence(); }}>
              <div className="mb-4">
                <label htmlFor="evidence" className="block text-sm font-medium text-gray-700 mb-1">
                  Foto ou Imagem
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Camera className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-1 text-sm text-gray-600">
                    Clique para adicionar ou arraste uma imagem
                  </p>
                  <input
                    type="file"
                    id="evidence"
                    className="hidden"
                    accept="image/*"
                  />
                  <button
                    type="button"
                    className="mt-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-sm"
                    onClick={() => document.getElementById("evidence")?.click()}
                  >
                    Escolher Arquivo
                  </button>
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                  Comentário (opcional)
                </label>
                <textarea
                  id="comment"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-clinic-yellow"
                  placeholder="Adicione um comentário sobre sua atividade..."
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
              
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  className="px-4 py-2 border rounded-md"
                  onClick={() => setShowEvidenceModal(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-clinic-yellow text-black px-4 py-2 rounded-md hover:bg-clinic-yellow/90 flex items-center"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Enviar Evidência
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Goal Details Modal */}
      {showGoalDetailsModal && selectedGoal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold">{selectedGoal.title}</h2>
              <button
                onClick={() => setShowGoalDetailsModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-bold mb-2">Detalhes da Meta</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Descrição:</p>
                    <p>{selectedGoal.description}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Data Limite:</p>
                    <p className="font-medium">{selectedGoal.dueDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Prioridade:</p>
                    <p>
                      {selectedGoal.priority === "alta" && (
                        <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-800">
                          Alta
                        </span>
                      )}
                      {selectedGoal.priority === "média" && (
                        <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-800">
                          Média
                        </span>
                      )}
                      {selectedGoal.priority === "baixa" && (
                        <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-800">
                          Baixa
                        </span>
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status:</p>
                    <p>
                      {selectedGoal.status === "completed" && (
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          <Check className="h-4 w-4 mr-1" /> Concluída
                        </span>
                      )}
                      {selectedGoal.status === "in-progress" && (
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          <Clock className="h-4 w-4 mr-1" /> Em Progresso
                        </span>
                      )}
                      {selectedGoal.status === "pending" && (
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          <AlertTriangle className="h-4 w-4 mr-1" /> Pendente
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-bold mb-2">Feedback e Evidências</h3>
                {selectedGoal.feedback ? (
                  <div className="bg-gray-50 p-3 rounded-md mb-4">
                    <p className="text-sm font-medium mb-1">Feedback do Profissional:</p>
                    <p className="text-sm">{selectedGoal.feedback}</p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-600 mb-4">
                    Nenhum feedback fornecido ainda.
                  </p>
                )}
                
                <h4 className="font-medium mb-2">Evidências:</h4>
                {selectedGoal.evidence.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2">
                    {selectedGoal.evidence.map((evidence, index) => (
                      <div key={index} className="rounded-md overflow-hidden">
                        <img 
                          src={evidence} 
                          alt="Evidência" 
                          className="w-full h-32 object-cover"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-600">
                    Nenhuma evidência adicionada ainda.
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex gap-3 justify-end">
              <button
                className="px-4 py-2 border rounded-md"
                onClick={() => setShowGoalDetailsModal(false)}
              >
                Fechar
              </button>
              
              {selectedGoal.status !== "completed" && (
                <button
                  className="bg-clinic-yellow text-black px-4 py-2 rounded-md hover:bg-clinic-yellow/90 flex items-center"
                  onClick={() => {
                    setShowGoalDetailsModal(false);
                    setShowEvidenceModal(true);
                  }}
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Adicionar Evidência
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDashboard;
