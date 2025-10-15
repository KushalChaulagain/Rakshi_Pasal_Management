import { Truck } from 'lucide-react';
import React from 'react';

export const Suppliers: React.FC = () => {
  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <Truck className="w-8 h-8 text-gray-900" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Suppliers</h1>
          <p className="text-gray-600 mt-1">
            Manage supplier records, contacts, and purchase orders.
          </p>
        </div>
      </div>

      {/* Three Cards Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Supplier Directory Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Supplier Directory
          </h2>
          <p className="text-gray-600">
            Coming soon: searchable list with contact info and statuses.
          </p>
        </div>

        {/* Recent Purchase Orders Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Recent Purchase Orders
          </h2>
          <p className="text-gray-600">Track outstanding and fulfilled POs.</p>
        </div>

        {/* Performance Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Performance
          </h2>
          <p className="text-gray-600">
            On-time delivery rate and average lead time.
          </p>
        </div>
      </div>
    </div>
  );
};
