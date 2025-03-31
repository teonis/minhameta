
import React from 'react';
import { X, Camera } from 'lucide-react';

interface EvidenceModalProps {
  onClose: () => void;
  handleAddEvidence: () => void;
}

const EvidenceModal = ({ onClose, handleAddEvidence }: EvidenceModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 w-full max-w-md">
        <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Registrar Progresso</h2>
        
        <form onSubmit={(e) => { e.preventDefault(); handleAddEvidence(); }}>
          <div className="mb-3 md:mb-4">
            <label htmlFor="progressDescription" className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
              Descrição do Progresso
            </label>
            <textarea
              id="progressDescription"
              className="w-full px-3 md:px-4 py-1.5 md:py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-clinic-yellow text-sm md:text-base"
              placeholder="Descreva seu progresso..."
              rows={3}
              required
            />
          </div>
          
          <div className="mb-3 md:mb-4">
            <label htmlFor="photoEvidence" className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
              Foto da Evidência (opcional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-4 md:p-6 text-center">
              <div className="flex flex-col items-center">
                <Camera className="h-6 w-6 md:h-8 md:w-8 text-gray-400 mb-2" />
                <p className="text-xs md:text-sm text-gray-500">Arraste uma imagem ou clique para selecionar</p>
                <input
                  type="file"
                  id="photoEvidence"
                  className="hidden"
                  accept="image/*"
                />
                <button
                  type="button"
                  onClick={() => document.getElementById("photoEvidence")?.click()}
                  className="mt-2 text-xs md:text-sm text-blue-600 hover:underline"
                >
                  Selecionar arquivo
                </button>
              </div>
            </div>
          </div>
          
          <div className="mb-3 md:mb-4">
            <label htmlFor="progressPercentage" className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
              Porcentagem de Conclusão
            </label>
            <div className="flex items-center">
              <input
                type="range"
                id="progressPercentage"
                min="0"
                max="100"
                step="10"
                defaultValue="50"
                className="w-full mr-2"
              />
              <span id="progressValue" className="text-xs md:text-sm">50%</span>
            </div>
          </div>
          
          <div className="flex justify-end gap-2 md:gap-3">
            <button
              type="button"
              className="px-3 md:px-4 py-1.5 md:py-2 border rounded-md text-xs md:text-sm"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-clinic-yellow text-black px-3 md:px-4 py-1.5 md:py-2 rounded-md hover:bg-clinic-yellow/90 text-xs md:text-sm"
            >
              Salvar Progresso
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EvidenceModal;
