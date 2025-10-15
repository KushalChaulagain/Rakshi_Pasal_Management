import React from 'react';

interface AlertSummaryCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  color: 'red' | 'orange' | 'blue' | 'green';
}

const colorClasses = {
  red: {
    icon: 'text-red-600',
    bg: 'bg-red-100',
  },
  orange: {
    icon: 'text-orange-600',
    bg: 'bg-orange-100',
  },
  blue: {
    icon: 'text-blue-600',
    bg: 'bg-blue-100',
  },
  green: {
    icon: 'text-green-600',
    bg: 'bg-green-100',
  },
};

export const AlertSummaryCard: React.FC<AlertSummaryCardProps> = ({
  title,
  count,
  icon,
  color,
}) => {
  const colors = colorClasses[color];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-4">
        <div
          className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center`}
        >
          <div className={colors.icon}>{icon}</div>
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900">{count}</p>
          <p className="text-sm text-gray-600">{title}</p>
        </div>
      </div>
    </div>
  );
};
