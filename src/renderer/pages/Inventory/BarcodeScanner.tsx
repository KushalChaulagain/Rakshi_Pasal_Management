import { QrCode } from 'lucide-react';
import React from 'react';

export const BarcodeScanner: React.FC = () => {
  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <QrCode className="w-8 h-8 text-gray-900" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Barcode Scanner</h1>
          <p className="text-gray-600 mt-1">
            Scan barcodes to quickly find products and manage stock.
          </p>
        </div>
      </div>

      {/* Two Cards Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scanner Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Scanner</h2>
          <p className="text-gray-600">
            Scanner interface placeholder. Integrate camera or hardware scanner
            here.
          </p>
        </div>

        {/* Recent Scans Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Recent Scans
          </h2>
          <p className="text-gray-600">No scans yet.</p>
        </div>
      </div>
    </div>
  );
};
