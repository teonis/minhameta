
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Users, 
  LogOut, 
  User, 
  Plus, 
  Settings, 
  Search, 
  Check, 
  Clock, 
  AlertTriangle 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Simulated data - would be fetched from backend in real app
const patientsData = [
  { id: 1, name: "Ana Silva", email: "ana@email.com", lastActivity: "2 dias atrás", totalGoals: 8, completedGoals: 5 },
  { id: 2, name: "Carlos Oliveira", email: "carlos@email.com", lastActivity: "Hoje", totalGoals: 6, completedGoals: 4 },
  { id: 3, name: "Mariana Santos", email: "mariana@email.com", lastActivity: "5 dias atrás", totalGoals: 10, completedGoals: 3 },
  { id: 4, name: "Bruno Costa", email: "bruno@email.com", lastActivity: "1 semana atrás", totalGoals: 7, completedGoals: 7 },
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

const ProfessionalDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [patientSearchTerm, setPatientSearchTerm] = useState("");
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  const [showAddGoalModal, setShowAddGoalModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<number | null>(null);
  
  const { toast } = useToast();
  
  // Filter patients based on search term
  const filteredPatients = patientsData.filter(patient => 
    patient.name.toLowerCase().includes(patientSearchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(patientSearchTerm.toLowerCase())
  );
  
  const handleAddPatient = () => {
    toast({
      title: "Paciente adicionado",
      description: "O paciente foi adicionado com sucesso.",
    });
    setShowAddPatientModal(false);
  };
  
  const handleAddGoal = () => {
    toast({
      title: "Meta criada",
      description: "A meta foi criada e atribuída com sucesso.",
    });
    setShowAddGoalModal(false);
  };
  
  const handlePatientSelect = (patientId: number) => {
    setSelectedPatient(patientId);
    setShowAddGoalModal(true);
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
                <span className="hidden md:inline">Dashboard</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("patients")}
                className={`w-full flex items-center px-4 py-3 ${
                  activeTab === "patients"
                    ? "bg-secondary-foreground/10 border-l-4 border-clinic-yellow"
                    : "hover:bg-secondary-foreground/5"
                }`}
              >
                <Users className="h-5 w-5 md:mr-3" />
                <span className="hidden md:inline">Pacientes</span>
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
              {activeTab === "dashboard" && "Dashboard do Profissional"}
              {activeTab === "patients" && "Gerenciar Pacientes"}
              {activeTab === "settings" && "Configurações"}
            </h1>
            
            <div className="flex items-center">
              <div className="mr-4 text-right hidden sm:block">
                <p className="font-medium">Tay Rocha</p>
                <p className="text-sm text-gray-600">Profissional</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-clinic-yellow flex items-center justify-center">
                <span className="font-bold text-black">TR</span>
              </div>
            </div>
          </div>
        </header>
        
        {/* Dashboard Content */}
        {activeTab === "dashboard" && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-2">Pacientes</h2>
                <p className="text-3xl font-bold">{patientsData.length}</p>
                <p className="text-sm text-gray-600">Total de pacientes ativos</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-2">Metas</h2>
                <p className="text-3xl font-bold">{goalsData.length}</p>
                <p className="text-sm text-gray-600">Total de metas criadas</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-2">Taxa de Conclusão</h2>
                <p className="text-3xl font-bold">70%</p>
                <p className="text-sm text-gray-600">Metas concluídas no prazo</p>
              </div>
            </div>
            
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Metas Recentes</h2>
                <button
                  className="flex items-center text-sm bg-clinic-yellow text-black px-3 py-1.5 rounded-md hover:bg-clinic-yellow/90"
                  onClick={() => setShowAddGoalModal(true)}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Nova Meta
                </button>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Paciente
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Meta
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Prioridade
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Data Limite
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {goalsData.map((goal) => (
                      <tr key={goal.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium">{goal.patientName}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium">{goal.title}</div>
                          <div className="text-sm text-gray-500">{goal.description.substring(0, 60)}...</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {goal.status === "completed" && (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              <Check className="h-4 w-4 mr-1" /> Concluída
                            </span>
                          )}
                          {goal.status === "in-progress" && (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              <Clock className="h-4 w-4 mr-1" /> Em Progresso
                            </span>
                          )}
                          {goal.status === "pending" && (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              <AlertTriangle className="h-4 w-4 mr-1" /> Pendente
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {goal.priority === "alta" && (
                            <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-800">
                              Alta
                            </span>
                          )}
                          {goal.priority === "média" && (
                            <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-800">
                              Média
                            </span>
                          )}
                          {goal.priority === "baixa" && (
                            <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-800">
                              Baixa
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {goal.dueDate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Pacientes Ativos</h2>
                <button
                  className="flex items-center text-sm bg-clinic-yellow text-black px-3 py-1.5 rounded-md hover:bg-clinic-yellow/90"
                  onClick={() => setShowAddPatientModal(true)}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Novo Paciente
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {patientsData.slice(0, 3).map((patient) => (
                  <div key={patient.id} className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">{patient.name}</h3>
                        <p className="text-gray-600 text-sm">{patient.email}</p>
                      </div>
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="font-bold text-gray-700">
                          {patient.name.split(" ").map(n => n[0]).join("")}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between text-sm">
                      <span>Última atividade:</span>
                      <span className="font-medium">{patient.lastActivity}</span>
                    </div>
                    <div className="mt-2 flex justify-between text-sm">
                      <span>Progresso:</span>
                      <span className="font-medium">{patient.completedGoals}/{patient.totalGoals} metas</span>
                    </div>
                    <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-clinic-yellow"
                        style={{ width: `${(patient.completedGoals / patient.totalGoals) * 100}%` }}
                      ></div>
                    </div>
                    <button
                      className="mt-4 w-full py-2 bg-secondary text-white rounded-md hover:bg-secondary/90 transition-colors text-sm"
                      onClick={() => handlePatientSelect(patient.id)}
                    >
                      Criar Nova Meta
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Patients Tab */}
        {activeTab === "patients" && (
          <div className="p-6">
            <div className="flex justify-between mb-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="pl-10 pr-4 py-2 border rounded-md w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-clinic-yellow"
                  placeholder="Pesquisar pacientes..."
                  value={patientSearchTerm}
                  onChange={(e) => setPatientSearchTerm(e.target.value)}
                />
              </div>
              
              <button
                className="flex items-center bg-clinic-yellow text-black px-4 py-2 rounded-md hover:bg-clinic-yellow/90"
                onClick={() => setShowAddPatientModal(true)}
              >
                <Plus className="h-5 w-5 mr-2" />
                Adicionar Paciente
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Paciente
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Última Atividade
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Progresso
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPatients.map((patient) => (
                    <tr key={patient.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                            <span className="font-bold text-gray-700">
                              {patient.name.split(" ").map(n => n[0]).join("")}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="font-medium">{patient.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {patient.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {patient.lastActivity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="mr-2">{patient.completedGoals}/{patient.totalGoals}</span>
                          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-clinic-yellow"
                              style={{ width: `${(patient.completedGoals / patient.totalGoals) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          className="text-sm bg-clinic-yellow text-black px-3 py-1 rounded-md hover:bg-clinic-yellow/90 mr-2"
                          onClick={() => handlePatientSelect(patient.id)}
                        >
                          Nova Meta
                        </button>
                        <button
                          className="text-sm bg-gray-100 text-gray-800 px-3 py-1 rounded-md hover:bg-gray-200"
                        >
                          Ver Detalhes
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="p-6">
            <div className="bg-white rounded-lg shadow-sm p-6 max-w-2xl">
              <h2 className="text-xl font-bold mb-6">Perfil do Profissional</h2>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-clinic-yellow"
                    defaultValue="Tay Rocha"
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
                    defaultValue="tay@clinicarocha.com.br"
                  />
                </div>
                
                <div>
                  <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-1">
                    Especialidade
                  </label>
                  <input
                    type="text"
                    id="specialty"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-clinic-yellow"
                    defaultValue="Terapeuta Comportamental"
                  />
                </div>
                
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                    Biografia
                  </label>
                  <textarea
                    id="bio"
                    rows={4}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-clinic-yellow"
                    defaultValue="Especialista em terapia comportamental, com foco no desenvolvimento de estratégias personalizadas para cada paciente."
                  />
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
      
      {/* Add Patient Modal */}
      {showAddPatientModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Adicionar Novo Paciente</h2>
            
            <form onSubmit={(e) => { e.preventDefault(); handleAddPatient(); }}>
              <div className="mb-4">
                <label htmlFor="patientName" className="block text-sm font-medium text-gray-700 mb-1">
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="patientName"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-clinic-yellow"
                  placeholder="Nome do paciente"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="patientEmail" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="patientEmail"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-clinic-yellow"
                  placeholder="email@exemplo.com"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="patientPhone" className="block text-sm font-medium text-gray-700 mb-1">
                  Telefone
                </label>
                <input
                  type="tel"
                  id="patientPhone"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-clinic-yellow"
                  placeholder="(00) 00000-0000"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="patientNotes" className="block text-sm font-medium text-gray-700 mb-1">
                  Observações
                </label>
                <textarea
                  id="patientNotes"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-clinic-yellow"
                  placeholder="Observações sobre o paciente"
                  rows={3}
                />
              </div>
              
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  className="px-4 py-2 border rounded-md"
                  onClick={() => setShowAddPatientModal(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-clinic-yellow text-black px-4 py-2 rounded-md hover:bg-clinic-yellow/90"
                >
                  Adicionar Paciente
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Add Goal Modal */}
      {showAddGoalModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Criar Nova Meta</h2>
            
            <form onSubmit={(e) => { e.preventDefault(); handleAddGoal(); }}>
              <div className="mb-4">
                <label htmlFor="goalPatient" className="block text-sm font-medium text-gray-700 mb-1">
                  Paciente
                </label>
                <select
                  id="goalPatient"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-clinic-yellow"
                  defaultValue={selectedPatient || ""}
                  required
                >
                  <option value="" disabled>Selecione um paciente</option>
                  {patientsData.map(patient => (
                    <option key={patient.id} value={patient.id}>{patient.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label htmlFor="goalTitle" className="block text-sm font-medium text-gray-700 mb-1">
                  Título da Meta
                </label>
                <input
                  type="text"
                  id="goalTitle"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-clinic-yellow"
                  placeholder="Título da meta"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="goalDescription" className="block text-sm font-medium text-gray-700 mb-1">
                  Descrição
                </label>
                <textarea
                  id="goalDescription"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-clinic-yellow"
                  placeholder="Descrição detalhada da meta"
                  rows={3}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="goalDueDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Data Limite
                  </label>
                  <input
                    type="date"
                    id="goalDueDate"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-clinic-yellow"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="goalPriority" className="block text-sm font-medium text-gray-700 mb-1">
                    Prioridade
                  </label>
                  <select
                    id="goalPriority"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-clinic-yellow"
                    required
                  >
                    <option value="baixa">Baixa</option>
                    <option value="média">Média</option>
                    <option value="alta">Alta</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  className="px-4 py-2 border rounded-md"
                  onClick={() => setShowAddGoalModal(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-clinic-yellow text-black px-4 py-2 rounded-md hover:bg-clinic-yellow/90"
                >
                  Criar Meta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfessionalDashboard;
