
import React from 'react';
import { Plus } from "lucide-react";
import PatientCard from './PatientCard';

type PatientType = {
  id: number;
  name: string;
  email: string;
  lastActivity: string;
  completedGoals: number;
  totalGoals: number;
};

type ActivePatientsListProps = {
  patientsData: PatientType[];
  onAddPatient: () => void;
  onPatientSelect: (id: number) => void;
};

const ActivePatientsList = ({ patientsData, onAddPatient, onPatientSelect }: ActivePatientsListProps) => {
  return (
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
          <PatientCard 
            key={patient.id} 
            patient={patient} 
            onPatientSelect={onPatientSelect} 
          />
        ))}
      </div>
    </div>
  );
};

export default ActivePatientsList;
