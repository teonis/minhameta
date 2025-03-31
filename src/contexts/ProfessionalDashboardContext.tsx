
import { createContext, useContext, ReactNode } from "react";
import { useProfessionalDashboardState } from "@/hooks/useProfessionalDashboardState";
import { ProfessionalDashboardContextType } from "@/types/professional";
import { goalTemplates } from "@/data/professionalMockData";

export const ProfessionalDashboardContext = createContext<ProfessionalDashboardContextType | undefined>(undefined);

export const ProfessionalDashboardProvider = ({ children }: { children: ReactNode }) => {
  const dashboardState = useProfessionalDashboardState();
  
  return (
    <ProfessionalDashboardContext.Provider value={{
      ...dashboardState,
      goalTemplates
    }}>
      {children}
    </ProfessionalDashboardContext.Provider>
  );
};

export const useProfessionalDashboard = () => {
  const context = useContext(ProfessionalDashboardContext);
  if (context === undefined) {
    throw new Error('useProfessionalDashboard must be used within a ProfessionalDashboardProvider');
  }
  return context;
};
