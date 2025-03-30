
import { useState } from "react";
import { Search, Plus, Users } from "lucide-react";

type PatientType = {
  id: number;
  name: string;
  email: string;
  lastActivity: string;
  completedGoals: number;
  totalGoals: number;
};

type PatientsListViewProps = {
  patientsData: PatientType[];
  isGroupGoal: boolean;
  selectedPatients: number[];
  onTogglePatientSelection: (id: number) => void;
  onPatientSelect: (id: number) => void;
  onViewPatientDetails: (id: number) => void;
  onAddPatient: () => void;
  onOpenGroupGoal: () => void;
};

const PatientsListView = ({
  patientsData,
  isGroupGoal,
  selectedPatients,
  onTogglePatientSelection,
  onPatientSelect,
  onViewPatientDetails,
  onAddPatient,
  onOpenGroupGoal
}: PatientsListViewProps) => {
  const [patientSearchTerm, setPatientSearchTerm] = useState("");

  const filteredPatients = patientsData.filter(patient => 
    patient.name.toLowerCase().includes(patientSearchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(patientSearchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
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
        
        <div className="flex gap-2">
          <button
            className="flex items-center bg-clinic-yellow text-black px-4 py-2 rounded-md hover:bg-clinic-yellow/90"
            onClick={onAddPatient}
          >
            <Plus className="h-5 w-5 mr-2" />
            Adicionar Paciente
          </button>
          <button
            className="flex items-center bg-secondary text-white px-4 py-2 rounded-md hover:bg-secondary/90"
            onClick={onOpenGroupGoal}
          >
            <Users className="h-5 w-5 mr-2" />
            Meta em Grupo
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {isGroupGoal && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Selecionar
                </th>
              )}
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
                {isGroupGoal && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input 
                      type="checkbox"
                      className="h-4 w-4 text-clinic-yellow focus:ring-clinic-yellow border-gray-300 rounded"
                      checked={selectedPatients.includes(patient.id)}
                      onChange={() => onTogglePatientSelection(patient.id)}
                    />
                  </td>
                )}
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
                    onClick={() => onPatientSelect(patient.id)}
                  >
                    Nova Meta
                  </button>
                  <button
                    className="text-sm bg-gray-100 text-gray-800 px-3 py-1 rounded-md hover:bg-gray-200"
                    onClick={() => onViewPatientDetails(patient.id)}
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
  );
};

export default PatientsListView;
