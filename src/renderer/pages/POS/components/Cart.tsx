import { Minus, Plus, ShoppingBag, ShoppingCart, Trash2 } from 'lucide-react';
import React from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

// Empty cart for now to match the design
const mockCartItems: CartItem[] = [];

export const Cart: React.FC = () => {
  const total = mockCartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
      {/* Cart Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <ShoppingCart className="w-5 h-5 text-gray-900" />
          <h2 className="text-xl font-semibold text-gray-900">Cart</h2>
        </div>
      </div>

      {/* Cart Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        {mockCartItems.length === 0 ? (
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Cart is empty
            </h3>
            <p className="text-sm text-gray-500">
              Add products to start a transaction
            </p>
          </div>
        ) : (
          <div className="w-full">
            {/* Cart Items */}
            <div className="space-y-4 mb-6">
              {mockCartItems.map(item => (
                <div
                  key={item.id}
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-xs text-gray-500">IMG</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 text-sm truncate">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button className="p-1 hover:bg-gray-200 rounded">
                      <Minus className="w-4 h-4 text-gray-600" />
                    </button>
                    <span className="text-sm font-medium w-6 text-center">
                      {item.quantity}
                    </span>
                    <button className="p-1 hover:bg-gray-200 rounded">
                      <Plus className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-1 hover:bg-red-100 rounded ml-2">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Footer */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">
                  Total:
                </span>
                <span className="text-xl font-bold text-gray-900">
                  ${total.toFixed(2)}
                </span>
              </div>

              <button className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                Process Payment
              </button>

              <button className="w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
