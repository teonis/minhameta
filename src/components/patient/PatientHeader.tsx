
import React, { useRef } from 'react';

interface PatientData {
  id: number;
  name: string;
  email: string;
  profilePicture: string | null;
  joinedDate: string;
}

interface PatientHeaderProps {
  patientData: PatientData;
  activeTab: string;
  profileImage: string | null;
  fileInputRef: React.RefObject<HTMLInputElement>;
  triggerFileInput: () => void;
}

const PatientHeader = ({ 
  patientData, 
  activeTab, 
  profileImage, 
  fileInputRef, 
  triggerFileInput 
}: PatientHeaderProps) => {
  return (
    <header className="bg-white shadow-sm p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-lg md:text-xl font-bold">
          {activeTab === "dashboard" && "Dashboard do Paciente"}
          {activeTab === "goals" && "Minhas Metas"}
          {activeTab === "diary" && "Meu Diário"}
          {activeTab === "medals" && "Minhas Medalhas"}
          {activeTab === "achievements" && "Minhas Conquistas"}
          {activeTab === "settings" && "Configurações"}
        </h1>
        
        <div className="flex items-center">
          <div className="mr-2 md:mr-4 text-right hidden sm:block">
            <p className="font-medium text-sm md:text-base">{patientData.name}</p>
            <p className="text-xs md:text-sm text-gray-600">Paciente</p>
          </div>
          <div 
            className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-clinic-yellow flex items-center justify-center overflow-hidden"
            onClick={triggerFileInput}
          >
            {profileImage ? (
              <img src={profileImage} alt="Perfil" className="h-full w-full object-cover" />
            ) : (
              <span className="font-bold text-black text-sm md:text-base">
                {patientData.name.split(" ").map(n => n[0]).join("")}
              </span>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
          />
        </div>
      </div>
    </header>
  );
};

export default PatientHeader;
