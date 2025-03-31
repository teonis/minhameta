
import React from 'react';
import { Link } from 'react-router-dom';
import { User, Trophy, Users, Settings } from 'lucide-react';

interface PatientMobileFooterProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const PatientMobileFooter = ({ activeTab, setActiveTab }: PatientMobileFooterProps) => {
  return (
    <>
      {activeTab !== "settings" && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 flex justify-around z-10">
          <Link to="/" className="flex flex-col items-center justify-center text-gray-700 hover:text-clinic-yellow">
            <User className="h-5 w-5" />
            <span className="text-xs mt-1">Início</span>
          </Link>
          
          <button onClick={() => setActiveTab("medals")} className="flex flex-col items-center justify-center text-gray-700 hover:text-clinic-yellow">
            <Trophy className="h-5 w-5" />
            <span className="text-xs mt-1">Medalhas</span>
          </button>
          
          <Link to="/comunidade" className="flex flex-col items-center justify-center text-gray-700 hover:text-clinic-yellow">
            <Users className="h-5 w-5" />
            <span className="text-xs mt-1">Comunidade</span>
          </Link>
          
          <button onClick={() => setActiveTab("settings")} className="flex flex-col items-center justify-center text-gray-700 hover:text-clinic-yellow">
            <Settings className="h-5 w-5" />
            <span className="text-xs mt-1">Perfil</span>
          </button>
        </div>
      )}
      
      {activeTab !== "settings" && <div className="h-16"></div>}
    </>
  );
};

export default PatientMobileFooter;
