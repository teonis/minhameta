
import React from 'react';
import { cn } from '@/lib/utils';

type StatsCardProps = {
  title: string;
  value: string | number;
  description: string;
  className?: string;
  icon?: React.ReactNode;
};

const StatsCard = ({ title, value, description, className, icon }: StatsCardProps) => {
  return (
    <div className={cn("bg-white rounded-lg shadow-sm p-6", className)}>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold">{title}</h2>
        {icon && <div className="text-gray-500">{icon}</div>}
      </div>
      <p className="text-3xl font-bold">{value}</p>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

export default StatsCard;
