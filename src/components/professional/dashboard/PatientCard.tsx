
import React from 'react';

type PatientType = {
  id: number;
  name: string;
  email: string;
  lastActivity: string;
  completedGoals: number;
  totalGoals: number;
};

type PatientCardProps = {
  patient: PatientType;
  onPatientSelect: (id: number) => void;
};

const PatientCard = ({ patient, onPatientSelect }: PatientCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
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
  );
};

export default PatientCard;
