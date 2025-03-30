
import { SidebarProvider } from "@/components/ui/sidebar";
import { ProfessionalDashboardProvider } from "@/contexts/ProfessionalDashboardContext";
import ProfessionalSidebar from "@/components/professional/ProfessionalSidebar";
import ProfessionalHeader from "@/components/professional/ProfessionalHeader";
import ProfessionalDashboardContent from "@/components/professional/ProfessionalDashboardContent";
import ProfessionalDashboardModals from "@/components/professional/ProfessionalDashboardModals";

const ProfessionalDashboard = () => {
  return (
    <ProfessionalDashboardProvider>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <ProfessionalSidebar />
          
          <div className="flex-grow bg-gray-50 overflow-y-auto">
            <ProfessionalHeader />
            <ProfessionalDashboardContent />
          </div>
        </div>
        
        <ProfessionalDashboardModals />
      </SidebarProvider>
    </ProfessionalDashboardProvider>
  );
};

export default ProfessionalDashboard;
