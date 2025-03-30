
import { Link } from "react-router-dom";
import { 
  Users, 
  LogOut, 
  User, 
  Settings
} from "lucide-react";

type SidebarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ProfessionalSidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  return (
    <aside className="bg-secondary text-white w-20 md:w-64 flex flex-col">
      <div className="p-4 flex items-center justify-center md:justify-start">
        <div className="bg-clinic-yellow p-2 rounded-md">
          <span className="font-bold text-clinic-black text-xl">MR</span>
        </div>
        <span className="font-bold text-xl hidden md:block ml-2">Minha Meta</span>
      </div>
      
      <nav className="flex-grow py-8">
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center px-4 py-3 ${
                activeTab === "dashboard"
                  ? "bg-secondary-foreground/10 border-l-4 border-clinic-yellow"
                  : "hover:bg-secondary-foreground/5"
              }`}
            >
              <User className="h-5 w-5 md:mr-3" />
              <span className="hidden md:inline">Dashboard</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("patients")}
              className={`w-full flex items-center px-4 py-3 ${
                activeTab === "patients"
                  ? "bg-secondary-foreground/10 border-l-4 border-clinic-yellow"
                  : "hover:bg-secondary-foreground/5"
              }`}
            >
              <Users className="h-5 w-5 md:mr-3" />
              <span className="hidden md:inline">Pacientes</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center px-4 py-3 ${
                activeTab === "settings"
                  ? "bg-secondary-foreground/10 border-l-4 border-clinic-yellow"
                  : "hover:bg-secondary-foreground/5"
              }`}
            >
              <Settings className="h-5 w-5 md:mr-3" />
              <span className="hidden md:inline">Configurações</span>
            </button>
          </li>
        </ul>
      </nav>
      
      <div className="p-4">
        <Link
          to="/login"
          className="flex items-center justify-center md:justify-start text-white/80 hover:text-white"
        >
          <LogOut className="h-5 w-5 md:mr-3" />
          <span className="hidden md:inline">Sair</span>
        </Link>
      </div>
    </aside>
  );
};

export default ProfessionalSidebar;
