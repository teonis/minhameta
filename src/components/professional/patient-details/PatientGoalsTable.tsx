
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { GoalType } from "@/types/professional";
import GoalStatusBadge from "./GoalStatusBadge";
import GoalPriorityBadge from "./GoalPriorityBadge";

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
                  <GoalStatusBadge status={goal.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <GoalPriorityBadge priority={goal.priority} />
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
