
import React from 'react';
import { Camera } from 'lucide-react';

interface PatientData {
  id: number;
  name: string;
  email: string;
  profilePicture: string | null;
  joinedDate: string;
}

interface SettingsTabProps {
  patientData: PatientData;
  profileImage: string | null;
  triggerFileInput: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

const SettingsTab = ({ patientData, profileImage, triggerFileInput, fileInputRef }: SettingsTabProps) => {
  return (
    <div className="p-3 md:p-6">
      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 max-w-2xl mx-auto">
        <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6">Meu Perfil</h2>
        
        <div className="flex flex-col sm:flex-row sm:items-center mb-4 md:mb-6">
          <div className="relative mb-3 sm:mb-0 sm:mr-4 md:mr-6 mx-auto sm:mx-0">
            <div className="h-20 w-20 md:h-24 md:w-24 rounded-full bg-gray-200 overflow-hidden">
              {profileImage ? (
                <img 
                  src={profileImage} 
                  alt="Foto de perfil" 
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-clinic-yellow">
                  <span className="text-xl md:text-2xl font-bold text-black">
                    {patientData.name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
              )}
            </div>
            <button 
              className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md border border-gray-200"
              onClick={triggerFileInput}
            >
              <Camera className="h-3 w-3 md:h-4 md:w-4" />
            </button>
          </div>
          
          <div className="text-center sm:text-left">
            <h3 className="font-bold text-base md:text-lg">{patientData.name}</h3>
            <p className="text-xs md:text-sm text-gray-600">{patientData.email}</p>
            <button 
              className="mt-1 md:mt-2 text-xs md:text-sm text-blue-600 hover:underline"
              onClick={triggerFileInput}
            >
              Alterar foto de perfil
            </button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              
            />
          </div>
        </div>
        
        <div className="space-y-4 md:space-y-6">
          <div>
            <label htmlFor="name" className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
              Nome Completo
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-3 md:px-4 py-1.5 md:py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-clinic-yellow text-sm md:text-base"
              defaultValue={patientData.name}
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 md:px-4 py-1.5 md:py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-clinic-yellow text-sm md:text-base"
              defaultValue={patientData.email}
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
              Senha
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 md:px-4 py-1.5 md:py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-clinic-yellow text-sm md:text-base"
              placeholder="••••••••"
            />
            <p className="text-xs text-gray-500 mt-1">Deixe em branco para manter a senha atual</p>
          </div>
          
          <div>
            <label htmlFor="passwordConfirm" className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
              Confirmar Senha
            </label>
            <input
              type="password"
              id="passwordConfirm"
              className="w-full px-3 md:px-4 py-1.5 md:py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-clinic-yellow text-sm md:text-base"
              placeholder="••••••••"
            />
          </div>
          
          <div>
            <label htmlFor="notifications" className="flex items-center">
              <input
                type="checkbox"
                id="notifications"
                className="h-4 w-4 text-clinic-yellow focus:ring-clinic-yellow border-gray-300 rounded mr-2"
                defaultChecked
              />
              <span className="text-xs md:text-sm text-gray-700">Receber notificações por email</span>
            </label>
          </div>
          
          <div>
            <button className="bg-clinic-yellow text-black px-3 md:px-4 py-1.5 md:py-2 rounded-md hover:bg-clinic-yellow/90 text-sm md:text-base">
              Salvar Alterações
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;
