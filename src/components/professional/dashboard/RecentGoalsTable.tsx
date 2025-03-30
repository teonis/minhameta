
import React from 'react';
import { Plus, Users, Check, Clock, AlertTriangle } from "lucide-react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

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

type RecentGoalsTableProps = {
  goalsData: GoalType[];
  onAddGoal: () => void;
  onOpenGroupGoalModal: () => void;
};

const RecentGoalsTable = ({ goalsData, onAddGoal, onOpenGroupGoalModal }: RecentGoalsTableProps) => {
  return (
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Paciente</TableHead>
              <TableHead>Meta</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Prioridade</TableHead>
              <TableHead>Data Limite</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {goalsData.map((goal) => (
              <TableRow key={goal.id} className="hover:bg-gray-50">
                <TableCell>
                  <div className="font-medium">{goal.patientName}</div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{goal.title}</div>
                  <div className="text-sm text-gray-500">{goal.description.substring(0, 60)}...</div>
                </TableCell>
                <TableCell className="whitespace-nowrap">
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
                </TableCell>
                <TableCell className="whitespace-nowrap">
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
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {goal.dueDate}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default RecentGoalsTable;
