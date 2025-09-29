import { Barcode, Clock, ShoppingCart, Users } from 'lucide-react';
import React, { useState } from 'react';
import { Cart } from './components/Cart';
import { ProductGrid } from './components/ProductGrid';

export const PointOfSale: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'products' | 'customer'>('products');
  const [searchQuery, setSearchQuery] = useState('');

  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  return (
    <div className="flex h-full bg-gray-50">
      {/* Main Content - Products */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center space-x-3">
                <ShoppingCart className="w-8 h-8 text-gray-900" />
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Point of Sale</h1>
                  <p className="text-gray-600 mt-1">
                    Process sales transactions and manage customer orders.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="px-6 py-2.5 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
                Sale
              </button>
              <button className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                Return
              </button>
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="w-5 h-5" />
                <span className="text-sm font-medium">{currentTime}</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center space-x-4 mb-6">
            <button
              onClick={() => setActiveTab('products')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'products'
                  ? 'bg-white border-2 border-gray-900 text-gray-900'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Products</span>
            </button>
            <button
              onClick={() => setActiveTab('customer')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'customer'
                  ? 'bg-white border-2 border-gray-900 text-gray-900'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Users className="w-5 h-5" />
              <span>Customer</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search by name, SKU, or barcode..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center space-x-2 px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Barcode className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-900">Scan</span>
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <ProductGrid searchQuery={searchQuery} />
        </div>
      </div>

      {/* Cart Sidebar */}
      <Cart />
    </div>
  );
};
