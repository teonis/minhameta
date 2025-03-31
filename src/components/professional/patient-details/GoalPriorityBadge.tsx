
import { Badge } from "@/components/ui/badge";

type GoalPriorityBadgeProps = {
  priority: string;
};

const GoalPriorityBadge = ({ priority }: GoalPriorityBadgeProps) => {
  switch (priority) {
    case "alta":
      return (
        <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-800">
          Alta
        </span>
      );
    case "média":
      return (
        <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-800">
          Média
        </span>
      );
    case "baixa":
      return (
        <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-800">
          Baixa
        </span>
      );
    default:
      return null;
  }
};

export default GoalPriorityBadge;
