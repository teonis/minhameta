
import { Check, Clock, AlertTriangle } from "lucide-react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { GoalType } from "@/types/professional";

type PatientGoalsTableProps = {
  patientGoals: GoalType[];
};

const PatientGoalsTable = ({ patientGoals }: PatientGoalsTableProps) => {
  return (
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
  );
};

export default PatientGoalsTable;
