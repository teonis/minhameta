
import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Send } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface DiaryEntry {
  id: number;
  date: string;
  content: string;
  mood: string;
}

interface DiaryTabProps {
  diaryEntries: DiaryEntry[];
  setDiaryEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
}

const DiaryTab = ({ diaryEntries, setDiaryEntries }: DiaryTabProps) => {
  const [diaryContent, setDiaryContent] = useState("");
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const { toast } = useToast();

  const handleDiarySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!diaryContent.trim() || !selectedMood) {
      toast({
        title: "Erro ao salvar",
        description: "Por favor, escreva como você está se sentindo e selecione um humor.",
        variant: "destructive"
      });
      return;
    }

    const newEntry = {
      id: diaryEntries.length + 1,
      date: new Date().toLocaleDateString('pt-BR'),
      content: diaryContent,
      mood: selectedMood
    };

    setDiaryEntries([newEntry, ...diaryEntries]);
    setDiaryContent("");
    setSelectedMood(null);

    toast({
      title: "Diário atualizado",
      description: "Seu registro foi adicionado com sucesso ao diário.",
    });
  };

  return (
    <div className="p-3 md:p-6">
      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-4 md:mb-6">
        <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Como você está se sentindo hoje?</h2>
        
        <form onSubmit={handleDiarySubmit}>
          <div className="mb-3 md:mb-4">
            <label htmlFor="diaryContent" className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
              Registre seus pensamentos, sentimentos e progresso
            </label>
            <Textarea
              id="diaryContent"
              placeholder="Hoje eu me sinto..."
              className="min-h-[80px] md:min-h-[120px]"
              value={diaryContent}
              onChange={(e) => setDiaryContent(e.target.value)}
            />
          </div>
          
          <div className="mb-3 md:mb-4">
            <p className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">Como está seu humor?</p>
            <div className="flex space-x-3 md:space-x-4">
              <button
                type="button"
                onClick={() => setSelectedMood("happy")}
                className={`p-2 md:p-3 rounded-full ${
                  selectedMood === "happy" ? "bg-green-100 ring-2 ring-green-500" : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                <span className="text-xl md:text-2xl">😊</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedMood("neutral")}
                className={`p-2 md:p-3 rounded-full ${
                  selectedMood === "neutral" ? "bg-blue-100 ring-2 ring-blue-500" : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                <span className="text-xl md:text-2xl">😐</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedMood("sad")}
                className={`p-2 md:p-3 rounded-full ${
                  selectedMood === "sad" ? "bg-red-100 ring-2 ring-red-500" : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                <span className="text-xl md:text-2xl">😔</span>
              </button>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center px-3 md:px-4 py-1 md:py-2 bg-clinic-yellow text-black rounded-md hover:bg-clinic-yellow/90 text-xs md:text-sm"
            >
              <Send className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
              Salvar no Diário
            </button>
          </div>
        </form>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-3 md:p-4 border-b">
          <h2 className="text-lg md:text-xl font-bold">Histórico do Diário</h2>
          <p className="text-xs md:text-sm text-gray-600">Seus registros anteriores</p>
        </div>
        
        <div className="p-3 md:p-4">
          <div className="space-y-4 md:space-y-6">
            {diaryEntries.map((entry) => (
              <div key={entry.id} className="bg-gray-50 rounded-lg p-3 md:p-4 border-l-4 border-clinic-yellow">
                <div className="flex justify-between items-start">
                  <div className="flex-grow">
                    <div className="flex items-center mb-1 md:mb-2">
                      <span className="text-xl md:text-2xl mr-2">
                        {entry.mood === "happy" && "😊"}
                        {entry.mood === "neutral" && "😐"}
                        {entry.mood === "sad" && "😔"}
                      </span>
                      <h3 className="font-bold text-sm md:text-base">{entry.date}</h3>
                    </div>
                    <p className="text-xs md:text-sm text-gray-700">{entry.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiaryTab;
