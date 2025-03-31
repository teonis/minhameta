
import { PatientType } from "@/types/professional";

type PatientDiaryEntriesProps = {
  currentPatient: PatientType;
};

const PatientDiaryEntries = ({ currentPatient }: PatientDiaryEntriesProps) => {
  return (
    <div className="space-y-4">
      {currentPatient.diaryEntries && currentPatient.diaryEntries.length > 0 ? (
        currentPatient.diaryEntries.map((entry) => (
          <div key={entry.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-medium">{entry.date}</h3>
                <div className="text-sm text-gray-500">
                  Humor: <span className="font-medium">{entry.mood}</span>
                </div>
              </div>
            </div>
            <p className="text-gray-700">{entry.content}</p>
          </div>
        ))
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-6 text-center text-gray-500">
          Este paciente ainda não possui entradas no diário.
        </div>
      )}
    </div>
  );
};

export default PatientDiaryEntries;
