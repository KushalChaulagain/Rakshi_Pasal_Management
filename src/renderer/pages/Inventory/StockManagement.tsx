import { Wine } from 'lucide-react';
import React from 'react';

export const StockManagement: React.FC = () => {
  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <Wine className="w-8 h-8 text-gray-900" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Stock Management</h1>
          <p className="text-gray-600 mt-1">
            View and adjust inventory levels, track stock in/out, and set
            thresholds.
          </p>
        </div>
      </div>

      {/* Three Cards Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Stock Overview Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Current Stock Overview
          </h2>
          <p className="text-gray-600">
            Coming soon: stock summary, low-stock list, and quick actions.
          </p>
        </div>

        {/* Recent Adjustments Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Recent Adjustments
          </h2>
          <p className="text-gray-600">No adjustments yet.</p>
        </div>

        {/* Thresholds Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Thresholds
          </h2>
          <p className="text-gray-600">
            Configure minimum stock levels per product.
          </p>
        </div>
      </div>
    </div>
  );
};
