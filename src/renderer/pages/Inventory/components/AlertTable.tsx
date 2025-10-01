import { Clock, Package, Plus, Truck } from 'lucide-react';
import React from 'react';
import { StockAlert } from '../../../../shared/types';

interface AlertTableProps {
  alerts: StockAlert[];
  onQuickAdd: (alertId: string) => void;
  onOrder: (alertId: string) => void;
}

const getPriorityColor = (priority: StockAlert['priority']) => {
  switch (priority) {
    case 'critical':
      return 'bg-red-500 text-white';
    case 'high':
      return 'bg-orange-500 text-white';
    case 'medium':
      return 'bg-yellow-500 text-gray-900';
    case 'low':
      return 'bg-green-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};

const getStockColor = (currentStock: number, minStock: number) => {
  if (currentStock === 0) {
    return 'text-red-600 font-semibold';
  } else if (currentStock <= minStock * 0.3) {
    return 'text-orange-600 font-semibold';
  }
  return 'text-gray-900 font-semibold';
};

const getDaysUntilOutColor = (daysUntilOut: number, isOutOfStock: boolean) => {
  if (isOutOfStock) {
    return 'text-red-600 font-semibold';
  } else if (daysUntilOut <= 3) {
    return 'text-red-600 font-semibold';
  }
  return 'text-gray-900';
};

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

export const AlertTable: React.FC<AlertTableProps> = ({
  alerts,
  onQuickAdd,
  onOrder,
}) => {
  return (
    <div className="w-full">
      <table className="w-full divide-y divide-gray-200 table-fixed">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="w-1/3 px-4 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
              Product
            </th>
            <th className="w-20 px-3 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
              Current Stock
            </th>
            <th className="w-20 px-3 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
              Priority
            </th>
            <th className="w-24 px-3 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
              Days Until Out
            </th>
            <th className="w-32 px-3 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
              Supplier
            </th>
            <th className="w-24 px-3 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
              Last Restock
            </th>
            <th className="w-48 px-3 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {alerts.map(alert => (
            <tr key={alert.id} className="hover:bg-gray-50">
              {/* Product */}
              <td className="w-1/3 px-4 py-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                    <Package className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold text-gray-900 truncate">
                      {alert.productName}
                    </div>
                    <div className="text-sm text-gray-500 truncate">
                      {alert.sku} • {alert.category}
                    </div>
                  </div>
                </div>
              </td>

              {/* Current Stock */}
              <td className="w-20 px-3 py-4">
                <div className="text-sm">
                  <span
                    className={getStockColor(
                      alert.currentStock,
                      alert.minStock
                    )}
                  >
                    {alert.currentStock}
                  </span>
                  <span className="text-gray-500"> / {alert.minStock} min</span>
                </div>
              </td>

              {/* Priority */}
              <td className="w-20 px-3 py-4">
                <span
                  className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full ${getPriorityColor(alert.priority)}`}
                >
                  {alert.priority.charAt(0).toUpperCase() +
                    alert.priority.slice(1)}
                </span>
              </td>

              {/* Days Until Out */}
              <td className="w-24 px-3 py-4">
                <div className="flex items-center text-sm">
                  <Clock className="w-4 h-4 text-gray-500 mr-1 flex-shrink-0" />
                  <span
                    className={getDaysUntilOutColor(
                      alert.daysUntilOut,
                      alert.isOutOfStock
                    )}
                  >
                    {alert.isOutOfStock
                      ? 'Out of Stock'
                      : `${alert.daysUntilOut} days`}
                  </span>
                </div>
              </td>

              {/* Supplier */}
              <td className="w-32 px-3 py-4 text-sm text-gray-900 truncate">
                {alert.supplier}
              </td>

              {/* Last Restock */}
              <td className="w-24 px-3 py-4 text-sm text-gray-900">
                {formatDate(alert.lastRestockDate)}
              </td>

              {/* Actions */}
              <td className="w-48 px-3 py-4 text-sm font-medium">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onQuickAdd(alert.id)}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 text-sm font-medium shadow-sm"
                  >
                    <Plus className="w-4 h-4 mr-1.5" />
                    Quick Add
                  </button>
                  <button
                    onClick={() => onOrder(alert.id)}
                    className="inline-flex items-center px-3 py-2 border border-transparent rounded-lg text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 text-sm font-medium shadow-sm"
                  >
                    <Truck className="w-4 h-4 mr-1.5" />
                    Order
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
