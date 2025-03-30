
import { SidebarTrigger } from "@/components/ui/sidebar";

type HeaderProps = {
  activeTab: string;
  viewingPatientDetails: boolean;
  currentPatient?: {
    name: string;
  } | null;
}

const ProfessionalHeader = ({ activeTab, viewingPatientDetails, currentPatient }: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="md:hidden" />
          <h1 className="text-xl font-bold">
            {activeTab === "dashboard" && "Dashboard do Profissional"}
            {activeTab === "patients" && !viewingPatientDetails && "Gerenciar Pacientes"}
            {activeTab === "patients" && viewingPatientDetails && `Detalhes do Paciente: ${currentPatient?.name}`}
            {activeTab === "settings" && "Configurações"}
          </h1>
        </div>
        
        <div className="flex items-center">
          <div className="mr-4 text-right hidden sm:block">
            <p className="font-medium">Tay Rocha</p>
            <p className="text-sm text-gray-600">Profissional</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-clinic-yellow flex items-center justify-center">
            <span className="font-bold text-black">TR</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ProfessionalHeader;
