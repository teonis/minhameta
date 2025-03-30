
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

type PatientType = {
  id: number;
  name: string;
};

type GoalTemplateType = {
  title: string;
  description: string;
};

type GoalTemplatesType = {
  [key: string]: GoalTemplateType[];
};

type AddGoalModalProps = {
  isOpen: boolean;
  onClose: () => void;
  patientsData: PatientType[];
  goalTemplates: GoalTemplatesType;
  selectedPatient: number | null;
  isGroupGoal: boolean;
  selectedPatients: number[];
};

const AddGoalModal = ({
  isOpen, 
  onClose, 
  patientsData, 
  goalTemplates, 
  selectedPatient,
  isGroupGoal,
  selectedPatients
}: AddGoalModalProps) => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<GoalTemplateType | null>(null);

  const handleAddGoal = () => {
    const message = isGroupGoal
      ? `Meta criada para ${selectedPatients.length} pacientes`
      : "Meta criada para o paciente";
      
    toast({
      title: "Meta criada",
      description: message,
    });
    onClose();
  };

  const handleSelectTemplate = (title: string, description: string) => {
    setSelectedTemplate({ title, description });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogTitle className="text-xl font-bold mb-4">
          {isGroupGoal ? "Criar Meta em Grupo" : "Criar Nova Meta"}
        </DialogTitle>
        
        <form onSubmit={(e) => { e.preventDefault(); handleAddGoal(); }}>
          {isGroupGoal ? (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pacientes Selecionados ({selectedPatients.length})
              </label>
              <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-gray-50">
                {selectedPatients.length > 0 ? (
                  patientsData
                    .filter(p => selectedPatients.includes(p.id))
                    .map(patient => (
                      <span key={patient.id} className="px-2 py-1 bg-gray-200 text-xs rounded-md">
                        {patient.name}
                      </span>
                    ))
                ) : (
                  <span className="text-gray-500 text-sm">Nenhum paciente selecionado</span>
                )}
              </div>
            </div>
          ) : (
            <div className="mb-4">
              <label htmlFor="goalPatient" className="block text-sm font-medium text-gray-700 mb-1">
                Paciente
              </label>
              <select
                id="goalPatient"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-clinic-yellow"
                defaultValue={selectedPatient || ""}
                required
              >
                <option value="" disabled>Selecione um paciente</option>
                {patientsData.map(patient => (
                  <option key={patient.id} value={patient.id}>{patient.name}</option>
                ))}
              </select>
            </div>
          )}
          
          <div className="mb-4">
            <label htmlFor="goalCategory" className="block text-sm font-medium text-gray-700 mb-1">
              Categoria da Meta
            </label>
            <select
              id="goalCategory"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-clinic-yellow"
              value={selectedCategory || ""}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
            >
              <option value="">Meta Personalizada</option>
              {Object.keys(goalTemplates).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          {selectedCategory && (
            <div className="mb-4">
              <label htmlFor="goalTemplate" className="block text-sm font-medium text-gray-700 mb-1">
                Modelo de Meta
              </label>
              <select
                id="goalTemplate"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-clinic-yellow"
                onChange={(e) => {
                  const templates = goalTemplates[selectedCategory as keyof typeof goalTemplates];
                  const selectedTemplateIndex = parseInt(e.target.value);
                  if (selectedTemplateIndex >= 0) {
                    const template = templates[selectedTemplateIndex];
                    handleSelectTemplate(template.title, template.description);
                  }
                }}
              >
                <option value="">Selecione um modelo</option>
                {goalTemplates[selectedCategory as keyof typeof goalTemplates].map((template, index) => (
                  <option key={index} value={index}>
                    {template.title}
                  </option>
                ))}
              </select>
            </div>
          )}
          
          <div className="mb-4">
            <label htmlFor="goalTitle" className="block text-sm font-medium text-gray-700 mb-1">
              Título da Meta
            </label>
            <input
              type="text"
              id="goalTitle"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-clinic-yellow"
              placeholder="Título da meta"
              required
              value={selectedTemplate?.title || ""}
              onChange={(e) => setSelectedTemplate(prev => prev ? {...prev, title: e.target.value} : null)}
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="goalDescription" className="block text-sm font-medium text-gray-700 mb-1">
              Descrição
            </label>
            <textarea
              id="goalDescription"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-clinic-yellow"
              placeholder="Descrição detalhada da meta"
              rows={3}
              required
              value={selectedTemplate?.description || ""}
              onChange={(e) => setSelectedTemplate(prev => prev ? {...prev, description: e.target.value} : null)}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="goalDueDate" className="block text-sm font-medium text-gray-700 mb-1">
                Data Limite
              </label>
              <input
                type="date"
                id="goalDueDate"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-clinic-yellow"
                required
              />
            </div>
            
            <div>
              <label htmlFor="goalPriority" className="block text-sm font-medium text-gray-700 mb-1">
                Prioridade
              </label>
              <select
                id="goalPriority"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-clinic-yellow"
                required
              >
                <option value="baixa">Baixa</option>
                <option value="média">Média</option>
                <option value="alta">Alta</option>
              </select>
            </div>
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
              disabled={isGroupGoal && selectedPatients.length === 0}
            >
              Criar Meta
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddGoalModal;
