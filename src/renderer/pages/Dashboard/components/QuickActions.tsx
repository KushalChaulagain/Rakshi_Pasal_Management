import {
  AlertTriangle,
  Barcode,
  FileText,
  Plus,
  ShoppingCart,
  UserPlus,
} from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface QuickActionButtonProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  color: string;
  onClick?: () => void;
}

const QuickActionButton: React.FC<QuickActionButtonProps> = ({
  icon,
  title,
  subtitle,
  color,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center p-6 bg-white rounded-xl border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-lg transition-all duration-200 group"
    >
      <div
        className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
      >
        {icon}
      </div>
      <h4 className="font-semibold text-gray-900">{title}</h4>
      <p className="text-sm text-gray-500 text-center mt-1">{subtitle}</p>
    </button>
  );
};

export const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  const handleQuickAction = (path: string) => {
    navigate(path);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-lg hover:border-gray-300 transition-all duration-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Quick Actions
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <QuickActionButton
          icon={<ShoppingCart className="w-6 h-6 text-white" />}
          title="New Sale"
          subtitle="Start a new transaction"
          color="bg-green-500"
          onClick={() => handleQuickAction('/pos')}
        />
        <QuickActionButton
          icon={<Plus className="w-6 h-6 text-white" />}
          title="Add Product"
          subtitle="Add new inventory item"
          color="bg-blue-500"
          onClick={() => handleQuickAction('/inventory')}
        />
        <QuickActionButton
          icon={<Barcode className="w-6 h-6 text-white" />}
          title="Scan Barcode"
          subtitle="Quick inventory update"
          color="bg-purple-500"
          onClick={() => handleQuickAction('/inventory/scanner')}
        />
        <QuickActionButton
          icon={<FileText className="w-6 h-6 text-white" />}
          title="View Reports"
          subtitle="Sales & analytics"
          color="bg-orange-500"
          onClick={() => handleQuickAction('/reports/sales')}
        />
        <QuickActionButton
          icon={<AlertTriangle className="w-6 h-6 text-white" />}
          title="Stock Alerts"
          subtitle="Check low inventory"
          color="bg-red-500"
          onClick={() => handleQuickAction('/inventory/alerts')}
        />
        <QuickActionButton
          icon={<UserPlus className="w-6 h-6 text-white" />}
          title="Add Customer"
          subtitle="Register new customer"
          color="bg-indigo-500"
          onClick={() => handleQuickAction('/sales/customers')}
        />
      </div>
    </div>
  );
};
