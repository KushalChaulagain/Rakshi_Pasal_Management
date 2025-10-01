import { AlertTriangle, Package, Plus } from 'lucide-react';
import React from 'react';

interface StockAlert {
  id: string;
  productName: string;
  category: string;
  sku: string;
  currentStock: number;
  minStock: number;
  priority: 'high' | 'medium' | 'critical';
}

const alerts: StockAlert[] = [
  {
    id: '1',
    productName: "Jack Daniel's Tennessee Whiskey 750ml",
    category: 'Whiskey',
    sku: 'SKU001',
    currentStock: 3,
    minStock: 10,
    priority: 'high',
  },
  {
    id: '2',
    productName: 'Grey Goose Vodka 750ml',
    category: 'Vodka',
    sku: 'SKU002',
    currentStock: 5,
    minStock: 15,
    priority: 'high',
  },
  {
    id: '3',
    productName: 'Corona Extra 12-Pack',
    category: 'Beer',
    sku: 'SKU003',
    currentStock: 8,
    minStock: 20,
    priority: 'medium',
  },
  {
    id: '4',
    productName: 'Patron Silver Tequila 750ml',
    category: 'Tequila',
    sku: 'SKU004',
    currentStock: 2,
    minStock: 8,
    priority: 'high',
  },
  {
    id: '5',
    productName: 'Champagne Dom Perignon',
    category: 'Champagne',
    sku: 'SKU005',
    currentStock: 1,
    minStock: 5,
    priority: 'critical',
  },
];

const priorityColors = {
  high: 'bg-orange-500 text-white',
  medium: 'bg-yellow-500 text-white',
  critical: 'bg-red-500 text-white',
};

export const LowStockAlerts: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-lg hover:border-gray-300 transition-all duration-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-orange-500" />
          <h3 className="text-lg font-semibold text-gray-900">
            Low Stock Alerts
          </h3>
        </div>
        <button className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          View All
        </button>
      </div>

      <div className="space-y-3">
        {alerts.map(alert => (
          <div
            key={alert.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100 hover:bg-gray-50 hover:border-gray-200 transition-all duration-200"
          >
            {/* Product Icon & Info */}
            <div className="flex items-center space-x-3 flex-1">
              <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-orange-600" />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 truncate">
                  {alert.productName}
                </h4>
                <p className="text-sm text-gray-500">
                  {alert.category} • {alert.sku}
                </p>
              </div>
            </div>

            {/* Stock Info */}
            <div className="text-right mr-4">
              <p className="font-semibold text-gray-900">
                {alert.currentStock} / {alert.minStock} units
              </p>
              <p className="text-xs text-gray-500">Current / Min Stock</p>
            </div>

            {/* Priority Badge */}
            <div className="flex items-center space-x-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${priorityColors[alert.priority]}`}
              >
                {alert.priority}
              </span>
              <button className="p-2 hover:bg-orange-100 rounded-lg transition-colors">
                <Plus className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button className="w-full flex items-center justify-center space-x-2 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <AlertTriangle className="w-4 h-4 text-gray-600" />
          <span className="font-medium text-gray-900">
            Manage All Stock Alerts
          </span>
        </button>
      </div>
    </div>
  );
};
