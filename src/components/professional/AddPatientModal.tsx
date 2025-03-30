
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

type AddPatientModalProps = {
  isOpen: boolean;
  onClose: () => void;
}

const AddPatientModal = ({ isOpen, onClose }: AddPatientModalProps) => {
  const { toast } = useToast();

  const handleAddPatient = () => {
    toast({
      title: "Paciente adicionado",
      description: "O paciente foi adicionado com sucesso.",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogTitle className="text-xl font-bold mb-4">Adicionar Novo Paciente</DialogTitle>
        
        <form onSubmit={(e) => { e.preventDefault(); handleAddPatient(); }}>
          <div className="mb-4">
            <label htmlFor="patientName" className="block text-sm font-medium text-gray-700 mb-1">
              Nome Completo
            </label>
            <input
              type="text"
              id="patientName"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-clinic-yellow"
              placeholder="Nome do paciente"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="patientEmail" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="patientEmail"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-clinic-yellow"
              placeholder="email@exemplo.com"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="patientPhone" className="block text-sm font-medium text-gray-700 mb-1">
              Telefone
            </label>
            <input
              type="tel"
              id="patientPhone"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-clinic-yellow"
              placeholder="(00) 00000-0000"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="patientNotes" className="block text-sm font-medium text-gray-700 mb-1">
              Observações
            </label>
            <textarea
              id="patientNotes"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-clinic-yellow"
              placeholder="Observações sobre o paciente"
              rows={3}
            />
          </div>
          
          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="px-4 py-2 border rounded-md"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-clinic-yellow text-black px-4 py-2 rounded-md hover:bg-clinic-yellow/90"
            >
              Adicionar Paciente
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPatientModal;
