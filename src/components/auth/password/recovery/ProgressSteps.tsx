
import { CheckCircle } from "lucide-react";

export enum PasswordRecoveryStep {
  REQUEST_CODE = 1,
  VERIFY_CODE = 2,
  RESET_PASSWORD = 3,
  SUCCESS = 4
}

interface ProgressStepsProps {
  currentStep: PasswordRecoveryStep;
}

const ProgressSteps = ({ currentStep }: ProgressStepsProps) => {
  return (
    <div className="flex justify-between mt-6 mb-8 relative">
      <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
      
      {[1, 2, 3].map((step) => (
        <div 
          key={step} 
          className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all ${
            currentStep >= step 
              ? "bg-clinic-yellow text-black" 
              : "bg-gray-200 text-gray-500"
          }`}
        >
          {currentStep > step ? (
            <CheckCircle className="h-5 w-5" />
          ) : (
            <span>{step}</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressSteps;
