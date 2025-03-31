
import { useState } from "react";
import { Calendar, Book } from "lucide-react";
import { GoalType, PatientType } from "@/types/professional";
import PatientGoalsTable from "./PatientGoalsTable";
import PatientDiaryEntries from "./PatientDiaryEntries";

type PatientDetailsTabsProps = {
  currentPatient: PatientType;
  patientGoals: GoalType[];
};

const PatientDetailsTabs = ({ currentPatient, patientGoals }: PatientDetailsTabsProps) => {
  const [activePatientTab, setActivePatientTab] = useState("goals");

  return (
    <>
      <div className="mb-6">
        <div className="flex border-b">
          <button
            className={`px-4 py-2 font-medium ${
              activePatientTab === "goals" 
                ? "border-b-2 border-clinic-yellow text-clinic-black" 
                : "text-gray-500"
            }`}
            onClick={() => setActivePatientTab("goals")}
          >
            <Calendar className="h-4 w-4 mr-1 inline-block" />
            Metas
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activePatientTab === "diary" 
                ? "border-b-2 border-clinic-yellow text-clinic-black" 
                : "text-gray-500"
            }`}
            onClick={() => setActivePatientTab("diary")}
          >
            <Book className="h-4 w-4 mr-1 inline-block" />
            Diário
          </button>
        </div>
      </div>
      
      {activePatientTab === "goals" && <PatientGoalsTable patientGoals={patientGoals} />}
      {activePatientTab === "diary" && <PatientDiaryEntries currentPatient={currentPatient} />}
    </>
  );
};

export default PatientDetailsTabs;
