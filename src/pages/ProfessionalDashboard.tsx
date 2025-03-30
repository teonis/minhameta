
import { SidebarProvider } from "@/components/ui/sidebar";
import { ProfessionalDashboardProvider } from "@/contexts/ProfessionalDashboardContext";
import ProfessionalSidebar from "@/components/professional/ProfessionalSidebar";
import ProfessionalHeader from "@/components/professional/ProfessionalHeader";
import ProfessionalDashboardContent from "@/components/professional/ProfessionalDashboardContent";
import ProfessionalDashboardModals from "@/components/professional/ProfessionalDashboardModals";
import { useIsMobile } from "@/hooks/use-mobile";

const ProfessionalDashboard = () => {
  const isMobile = useIsMobile();
  
  return (
    <ProfessionalDashboardProvider>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <ProfessionalSidebar />
          
          <div className="flex-grow bg-gray-50 overflow-y-auto">
            <ProfessionalHeader />
            <ProfessionalDashboardContent />
            
            {isMobile && (
              <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 flex justify-around z-10">
                <button className="flex flex-col items-center justify-center text-clinic-yellow">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span className="text-xs mt-1">Dashboard</span>
                </button>
                
                <button className="flex flex-col items-center justify-center text-gray-700 hover:text-clinic-yellow">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="text-xs mt-1">Pacientes</span>
                </button>
                
                <button className="flex flex-col items-center justify-center text-gray-700 hover:text-clinic-yellow">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs mt-1">Agenda</span>
                </button>
                
                <button className="flex flex-col items-center justify-center text-gray-700 hover:text-clinic-yellow">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
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
