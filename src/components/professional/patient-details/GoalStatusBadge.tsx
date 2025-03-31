
import { Check, Clock, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type GoalStatusBadgeProps = {
  status: string;
};

const GoalStatusBadge = ({ status }: GoalStatusBadgeProps) => {
  switch (status) {
    case "completed":
      return (
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          <Check className="h-4 w-4 mr-1" /> Concluída
        </span>
      );
    case "in-progress":
      return (
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
          <Clock className="h-4 w-4 mr-1" /> Em Progresso
        </span>
      );
    case "pending":
      return (
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
          <AlertTriangle className="h-4 w-4 mr-1" /> Pendente
        </span>
      );
    default:
      return null;
  }
};

export default GoalStatusBadge;
