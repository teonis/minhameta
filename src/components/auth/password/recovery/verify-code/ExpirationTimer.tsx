
import React, { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Clock } from "lucide-react";

interface ExpirationTimerProps {
  expirationTime: Date | null;
}

const ExpirationTimer: React.FC<ExpirationTimerProps> = ({ expirationTime }) => {
  const [expirationProgress, setExpirationProgress] = useState(100);

  useEffect(() => {
    const updateExpirationProgress = () => {
      if (!expirationTime) return;
      
      const now = new Date();
      const expiresAt = new Date(expirationTime);
      const totalDuration = 15 * 60 * 1000; // 15 minutos em milissegundos
      const elapsed = expiresAt.getTime() - now.getTime();
      const remaining = Math.max(0, elapsed);
      const progress = Math.round((remaining / totalDuration) * 100);
      
      setExpirationProgress(progress);
      
      if (progress > 0) {
        setTimeout(updateExpirationProgress, 1000);
      }
    };

    updateExpirationProgress();
    
    return () => {
      // Cleanup timeout on unmount
    };
  }, [expirationTime]);

  const formatTimeRemaining = (): string => {
    if (!expirationTime) return "";
    
    const now = new Date();
    const expiresAt = new Date(expirationTime);
    const remaining = Math.max(0, Math.floor((expiresAt.getTime() - now.getTime()) / 1000));
    
    if (remaining <= 0) return "Expirado";
    
    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;
    
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center text-xs">
        <div className="flex items-center gap-1 text-gray-500">
          <Clock className="h-3 w-3" />
          <span>Expira em: {formatTimeRemaining()}</span>
        </div>
        <span 
          className={`font-medium ${
            expirationProgress < 30 
              ? "text-red-500" 
              : expirationProgress < 70 
                ? "text-yellow-500" 
                : "text-green-500"
          }`}
        >
          {expirationProgress}%
        </span>
      </div>
      <Progress 
        value={expirationProgress} 
        className={`h-2 ${
          expirationProgress < 30 
            ? "bg-red-200" 
            : expirationProgress < 70 
              ? "bg-yellow-200" 
              : "bg-green-200"
        }`}
        indicatorClassName={
          expirationProgress < 30 
            ? "bg-red-500" 
            : expirationProgress < 70 
              ? "bg-yellow-500" 
              : "bg-green-500"
        }
      />
    </div>
  );
};

export default ExpirationTimer;
