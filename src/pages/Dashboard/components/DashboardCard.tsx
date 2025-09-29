import React from 'react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  subtitle?: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  icon,
  trend,
  subtitle,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:border-gray-300 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 font-medium mb-2">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
          {trend && (
            <div className="flex items-center mt-2 text-sm">
              <span
                className={`font-medium px-2 py-0.5 rounded ${
                  trend.isPositive
                    ? 'text-green-600 bg-green-50'
                    : 'text-red-600 bg-red-50'
                }`}
              >
                {trend.value}
              </span>
              {subtitle && (
                <span className="text-gray-500 ml-2">{subtitle}</span>
              )}
            </div>
          )}
        </div>
        <div className="text-gray-400">{icon}</div>
      </div>
    </div>
  );
};
