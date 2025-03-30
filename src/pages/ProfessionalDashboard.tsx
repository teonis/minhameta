
import { SidebarProvider } from "@/components/ui/sidebar";
import { ProfessionalDashboardProvider } from "@/contexts/ProfessionalDashboardContext";
import ProfessionalSidebar from "@/components/professional/ProfessionalSidebar";
import ProfessionalHeader from "@/components/professional/ProfessionalHeader";
import ProfessionalDashboardContent from "@/components/professional/ProfessionalDashboardContent";
import ProfessionalDashboardModals from "@/components/professional/ProfessionalDashboardModals";
import { useIsMobile } from "@/hooks/use-mobile";
import { Home, Users, Calendar, User } from "lucide-react";

const ProfessionalDashboard = () => {
  const isMobile = useIsMobile();
  
  return (
    <ProfessionalDashboardProvider>
      <SidebarProvider>
        <div className="min-h-screen flex w-full flex-col md:flex-row">
          <ProfessionalSidebar />
          
          <div className="flex-grow bg-gray-50 overflow-y-auto">
            <ProfessionalHeader />
            <ProfessionalDashboardContent />
            
            {isMobile && (
              <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 flex justify-around z-10">
                <button className="flex flex-col items-center justify-center text-clinic-yellow">
                  <Home className="h-5 w-5" />
                  <span className="text-xs mt-1">Dashboard</span>
                </button>
                
                <button className="flex flex-col items-center justify-center text-gray-700 hover:text-clinic-yellow">
                  <Users className="h-5 w-5" />
                  <span className="text-xs mt-1">Pacientes</span>
                </button>
                
                <button className="flex flex-col items-center justify-center text-gray-700 hover:text-clinic-yellow">
                  <Calendar className="h-5 w-5" />
                  <span className="text-xs mt-1">Agenda</span>
                </button>
                
                <button className="flex flex-col items-center justify-center text-gray-700 hover:text-clinic-yellow">
                  <User className="h-5 w-5" />
                  <span className="text-xs mt-1">Perfil</span>
                </button>
              </div>
            )}
            
            {isMobile && <div className="h-16"></div>}
          </div>
        </div>
        
        <ProfessionalDashboardModals />
      </SidebarProvider>
    </ProfessionalDashboardProvider>
  );
};

export default ProfessionalDashboard;
