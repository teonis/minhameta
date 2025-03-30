
import React from 'react';
import StatsCard from './dashboard/StatsCard';
import RecentGoalsTable from './dashboard/RecentGoalsTable';
import ActivePatientsList from './dashboard/ActivePatientsList';

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
  // Calculate completion rate (temporary simulation)
  const completionRate = "70%";
  
  return (
    <div className="p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard 
          title="Pacientes" 
          value={patientsData.length} 
          description="Total de pacientes ativos" 
        />
        <StatsCard 
          title="Metas" 
          value={goalsData.length} 
          description="Total de metas criadas" 
        />
        <StatsCard 
          title="Taxa de Conclusão" 
          value={completionRate} 
          description="Metas concluídas no prazo" 
        />
      </div>
      
      {/* Recent Goals Table */}
      <RecentGoalsTable 
        goalsData={goalsData} 
        onAddGoal={onAddGoal} 
        onOpenGroupGoalModal={onOpenGroupGoalModal} 
      />
      
      {/* Active Patients List */}
      <ActivePatientsList 
        patientsData={patientsData} 
        onAddPatient={onAddPatient} 
        onPatientSelect={onPatientSelect} 
      />
    </div>
  );
};

export default DashboardView;
