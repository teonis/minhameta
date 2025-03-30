
import React from 'react';

type StatsCardProps = {
  title: string;
  value: string | number;
  description: string;
};

const StatsCard = ({ title, value, description }: StatsCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-3xl font-bold">{value}</p>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

export default StatsCard;
