
import { Plus, Users, Check, Clock, AlertTriangle } from "lucide-react";

type PatientType = {
  id: number;
  name: string;
  email: string;
  lastActivity: string;
  completedGoals: number;
  totalGoals: number;
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

type DashboardViewProps = {
  patientsData: PatientType[];
  goalsData: GoalType[];
  onAddPatient: () => void;
  onAddGoal: () => void;
  onPatientSelect: (id: number) => void;
  onOpenGroupGoalModal: () => void;
};

const DashboardView = ({ 
  patientsData, 
  goalsData, 
  onAddPatient, 
  onAddGoal, 
  onPatientSelect,
  onOpenGroupGoalModal
}: DashboardViewProps) => {
  return (
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
          <div className="flex gap-2">
            <button
              className="flex items-center text-sm bg-clinic-yellow text-black px-3 py-1.5 rounded-md hover:bg-clinic-yellow/90"
              onClick={onAddGoal}
            >
              <Plus className="h-4 w-4 mr-1" />
              Nova Meta Individual
            </button>
            <button
              className="flex items-center text-sm bg-secondary text-white px-3 py-1.5 rounded-md hover:bg-secondary/90"
              onClick={onOpenGroupGoalModal}
            >
              <Users className="h-4 w-4 mr-1" />
              Nova Meta em Grupo
            </button>
          </div>
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
            onClick={onAddPatient}
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
                onClick={() => onPatientSelect(patient.id)}
              >
                Criar Nova Meta
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
