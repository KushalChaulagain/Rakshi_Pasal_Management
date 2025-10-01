import { Clock, QrCode, Search, ShoppingCart, User } from 'lucide-react';
import React, { useState } from 'react';
import { Cart } from './components/Cart';
import { Customer } from './components/Customer';
import { ProductGrid } from './components/ProductGrid';

export const PointOfSale: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('Sale');
  const [activeView, setActiveView] = useState('Products');

  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  return (
    <div className="flex h-full bg-white">
      {/* Main Content - Products */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <ShoppingCart className="w-8 h-8 text-gray-700" />
                <h1 className="text-3xl font-bold text-gray-900">
                  Point of Sale
                </h1>
              </div>
              <p className="text-gray-600 text-sm">
                Process sales transactions and manage customer orders.
              </p>
            </div>

            <div className="flex items-center space-x-4">
              {/* Sale/Return Tabs */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('Sale')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'Sale'
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  Sale
                </button>
                <button
                  onClick={() => setActiveTab('Return')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'Return'
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  Return
                </button>
              </div>

              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="w-5 h-5" />
                <span className="text-sm font-medium">{currentTime}</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-gray-100 rounded-lg p-1 mb-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setActiveView('Products')}
                className={`flex items-center justify-center space-x-2 px-6 py-2 rounded-lg transition-all duration-200 flex-1 ${
                  activeView === 'Products'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-900'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="font-medium">Products</span>
              </button>
              <button
                onClick={() => setActiveView('Customer')}
                className={`flex items-center justify-center space-x-2 px-6 py-2 rounded-lg transition-all duration-200 flex-1 ${
                  activeView === 'Customer'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-900'
                }`}
              >
                <User className="w-5 h-5" />
                <span className="font-medium">Customer</span>
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, SKU, or barcode..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-300"
                />
              </div>
              <button className="flex items-center space-x-2 px-6 py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <QrCode className="w-5 h-5 text-gray-900" />
                <span className="font-medium text-gray-900">Scan</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          {activeView === 'Products' ? (
            <div className="p-6">
              <ProductGrid searchQuery={searchQuery} />
            </div>
          ) : (
            <Customer />
          )}
        </div>
      </div>

      {/* Cart Sidebar */}
      <Cart />
    </div>
  );
};
