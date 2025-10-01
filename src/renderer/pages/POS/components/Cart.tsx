import { Minus, Plus, Trash2 } from 'lucide-react';
import React from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

const mockCartItems: CartItem[] = [
  {
    id: 1,
    name: "Jack Daniel's Tennessee Whiskey 750ml",
    price: 45.99,
    quantity: 1,
  },
  {
    id: 2,
    name: 'Budweiser 12-Pack',
    price: 12.99,
    quantity: 2,
  },
];

export const Cart: React.FC = () => {
  const total = mockCartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
      {/* Cart Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Shopping Cart</h2>
        <p className="text-sm text-gray-500 mt-1">
          {mockCartItems.length} items
        </p>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-4">
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
      </div>

      {/* Cart Footer */}
      <div className="p-6 border-t border-gray-200 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-900">Total:</span>
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
  );
};
