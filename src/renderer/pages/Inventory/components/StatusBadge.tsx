import { AlertTriangle, Check, X } from 'lucide-react';
import React from 'react';

interface StatusBadgeProps {
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'in-stock':
        return {
          label: 'In Stock',
          icon: <Check className="w-3 h-3" />,
          className: 'bg-green-100 text-green-800 border-green-200',
          iconClassName: 'text-green-600',
        };
      case 'low-stock':
        return {
          label: 'Low Stock',
          icon: <AlertTriangle className="w-3 h-3" />,
          className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          iconClassName: 'text-yellow-600',
        };
      case 'out-of-stock':
        return {
          label: 'Out of Stock',
          icon: <X className="w-3 h-3" />,
          className: 'bg-red-100 text-red-800 border-red-200',
          iconClassName: 'text-red-600',
        };
      default:
        return {
          label: 'Unknown',
          icon: <AlertTriangle className="w-3 h-3" />,
          className: 'bg-gray-100 text-gray-800 border-gray-200',
          iconClassName: 'text-gray-600',
        };
    }
  };

  const config = getStatusConfig();

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${config.className}`}
    >
      <span className={config.iconClassName}>{config.icon}</span>
      {config.label}
    </span>
  );
};
