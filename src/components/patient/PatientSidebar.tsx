
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  LogOut, 
  User, 
  CheckCircle, 
  FileText, 
  Trophy,
  Calendar,
  Settings
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface PatientSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const PatientSidebar = ({ activeTab, setActiveTab }: PatientSidebarProps) => {
  const isMobile = useIsMobile();

  const handleTabChange = (tab: string) => {
    // Only change the tab if it's different from the current one
    if (tab !== activeTab) {
      setActiveTab(tab);
    }
  };

  return (
    <aside className="bg-secondary text-white w-full md:w-20 lg:w-64 md:flex md:flex-col md:min-h-screen z-20">
      <div className="p-4 flex items-center justify-center md:justify-start">
        <div className="bg-clinic-yellow p-2 rounded-md">
          <span className="font-bold text-clinic-black text-xl">MR</span>
        </div>
        <span className="font-bold text-xl hidden lg:block ml-2">Minha Meta</span>
      </div>
      
      {isMobile ? (
        <nav className="flex justify-around p-2 border-t border-secondary-foreground/20">
          <button
            onClick={() => handleTabChange("dashboard")}
            className={`flex flex-col items-center p-2 ${activeTab === "dashboard" ? "text-clinic-yellow" : "text-white/80"}`}
          >
            <User className="h-5 w-5" />
            <span className="text-xs mt-1">Dashboard</span>
          </button>
          <button
            onClick={() => handleTabChange("goals")}
            className={`flex flex-col items-center p-2 ${activeTab === "goals" ? "text-clinic-yellow" : "text-white/80"}`}
          >
            <CheckCircle className="h-5 w-5" />
            <span className="text-xs mt-1">Metas</span>
          </button>
          <button
            onClick={() => handleTabChange("diary")}
            className={`flex flex-col items-center p-2 ${activeTab === "diary" ? "text-clinic-yellow" : "text-white/80"}`}
          >
            <FileText className="h-5 w-5" />
            <span className="text-xs mt-1">Diário</span>
          </button>
          <button
            onClick={() => handleTabChange("medals")} 
            className={`flex flex-col items-center p-2 ${activeTab === "medals" ? "text-clinic-yellow" : "text-white/80"}`}
          >
            <Trophy className="h-5 w-5" />
            <span className="text-xs mt-1">Medalhas</span>
          </button>
        </nav>
      ) : (
        <nav className="flex-grow py-8">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => handleTabChange("dashboard")}
                className={`w-full flex items-center px-4 py-3 ${
                  activeTab === "dashboard"
                    ? "bg-secondary-foreground/10 border-l-4 border-clinic-yellow"
                    : "hover:bg-secondary-foreground/5"
                }`}
              >
                <User className="h-5 w-5 md:mr-3" />
                <span className="hidden lg:inline">Dashboard</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleTabChange("goals")}
                className={`w-full flex items-center px-4 py-3 ${
                  activeTab === "goals"
                    ? "bg-secondary-foreground/10 border-l-4 border-clinic-yellow"
                    : "hover:bg-secondary-foreground/5"
                }`}
              >
                <CheckCircle className="h-5 w-5 md:mr-3" />
                <span className="hidden lg:inline">Minhas Metas</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleTabChange("diary")}
                className={`w-full flex items-center px-4 py-3 ${
                  activeTab === "diary"
                    ? "bg-secondary-foreground/10 border-l-4 border-clinic-yellow"
                    : "hover:bg-secondary-foreground/5"
                }`}
              >
                <FileText className="h-5 w-5 md:mr-3" />
                <span className="hidden lg:inline">Meu Diário</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleTabChange("medals")}
                className={`w-full flex items-center px-4 py-3 ${
                  activeTab === "medals"
                    ? "bg-secondary-foreground/10 border-l-4 border-clinic-yellow"
                    : "hover:bg-secondary-foreground/5"
                }`}
              >
                <Trophy className="h-5 w-5 md:mr-3" />
                <span className="hidden lg:inline">Minhas Medalhas</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleTabChange("achievements")}
                className={`w-full flex items-center px-4 py-3 ${
                  activeTab === "achievements"
                    ? "bg-secondary-foreground/10 border-l-4 border-clinic-yellow"
                    : "hover:bg-secondary-foreground/5"
                }`}
              >
                <Calendar className="h-5 w-5 md:mr-3" />
                <span className="hidden lg:inline">Conquistas</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleTabChange("settings")}
                className={`w-full flex items-center px-4 py-3 ${
                  activeTab === "settings"
                    ? "bg-secondary-foreground/10 border-l-4 border-clinic-yellow"
                    : "hover:bg-secondary-foreground/5"
                }`}
              >
                <Settings className="h-5 w-5 md:mr-3" />
                <span className="hidden lg:inline">Configurações</span>
              </button>
            </li>
          </ul>
        </nav>
      )}
      
      {!isMobile && (
        <div className="p-4">
          <Link
            to="/login"
            className="flex items-center justify-center lg:justify-start text-white/80 hover:text-white"
          >
            <LogOut className="h-5 w-5 lg:mr-3" />
            <span className="hidden lg:inline">Sair</span>
          </Link>
        </div>
      )}
    </aside>
  );
};

export default PatientSidebar;
