
import { useState } from "react";
import { ArrowLeft, Calendar, Book, Check, Clock, AlertTriangle } from "lucide-react";

type PatientType = {
  id: number;
  name: string;
  email: string;
  phone: string;
  lastActivity: string;
  completedGoals: number;
  totalGoals: number;
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
  title: string;
  status: string;
  dueDate: string;
  priority: string;
  description: string;
};

type PatientDetailsViewProps = {
  currentPatient: PatientType;
  patientGoals: GoalType[];
  onBackToPatientsList: () => void;
  onAddGoal: (patientId: number) => void;
};

const PatientDetailsView = ({
  currentPatient,
  patientGoals,
  onBackToPatientsList,
  onAddGoal
}: PatientDetailsViewProps) => {
  const [activePatientTab, setActivePatientTab] = useState("goals");

  return (
    <div className="p-6">
      <button 
        onClick={onBackToPatientsList}
        className="flex items-center text-secondary mb-6 hover:underline"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Voltar para lista de pacientes
      </button>
      
      <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center">
            <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="font-bold text-gray-700 text-xl">
                {currentPatient.name.split(" ").map(n => n[0]).join("")}
              </span>
            </div>
            <div className="ml-4">
              <h2 className="text-2xl font-bold">{currentPatient.name}</h2>
              <div className="text-gray-600">{currentPatient.email}</div>
              <div className="text-gray-600">{currentPatient.phone}</div>
              <div className="mt-1 text-sm">
                <span className="font-semibold">Última atividade:</span> {currentPatient.lastActivity}
              </div>
            </div>
          </div>
          
          <button
            className="bg-clinic-yellow text-black px-4 py-2 rounded-md hover:bg-clinic-yellow/90"
            onClick={() => onAddGoal(currentPatient.id)}
          >
            <span className="mr-1">+</span>
            Nova Meta
          </button>
        </div>
        
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <span className="text-gray-700">Progresso</span>
            <div className="text-2xl font-bold">
              {currentPatient.completedGoals}/{currentPatient.totalGoals} metas
            </div>
          </div>
          <div className="w-64 h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-clinic-yellow"
              style={{ width: `${(currentPatient.completedGoals / currentPatient.totalGoals) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex border-b">
          <button
            className={`px-4 py-2 font-medium ${
              activePatientTab === "goals" 
                ? "border-b-2 border-clinic-yellow text-clinic-black" 
                : "text-gray-500"
            }`}
            onClick={() => setActivePatientTab("goals")}
          >
            <Calendar className="h-4 w-4 mr-1 inline-block" />
            Metas
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activePatientTab === "diary" 
                ? "border-b-2 border-clinic-yellow text-clinic-black" 
                : "text-gray-500"
            }`}
            onClick={() => setActivePatientTab("diary")}
          >
            <Book className="h-4 w-4 mr-1 inline-block" />
            Diário
          </button>
        </div>
      </div>
      
      {activePatientTab === "goals" && (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
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
              {patientGoals.length > 0 ? (
                patientGoals.map((goal) => (
                  <tr key={goal.id} className="hover:bg-gray-50">
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
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                    Este paciente ainda não possui metas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      
      {activePatientTab === "diary" && (
        <div className="space-y-4">
          {currentPatient.diaryEntries && currentPatient.diaryEntries.length > 0 ? (
            currentPatient.diaryEntries.map((entry) => (
              <div key={entry.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-medium">{entry.date}</h3>
                    <div className="text-sm text-gray-500">
                      Humor: <span className="font-medium">{entry.mood}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700">{entry.content}</p>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-6 text-center text-gray-500">
              Este paciente ainda não possui entradas no diário.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PatientDetailsView;
