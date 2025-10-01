import { Calendar, Mail, Phone, Plus, Search, Users } from 'lucide-react';
import React, { useState } from 'react';

interface Customer {
  id: number;
  name: string;
  age: number;
  phone: string;
  email: string;
  isVerified: boolean;
  totalPurchases: number;
  lastPurchase: string;
}

const mockCustomers: Customer[] = [
  {
    id: 1,
    name: 'John Smith',
    age: 40,
    phone: '(555) 123-4567',
    email: 'john.smith@email.com',
    isVerified: true,
    totalPurchases: 45,
    lastPurchase: '2024-01-14',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    age: 33,
    phone: '(555) 234-5678',
    email: 'sarah.j@email.com',
    isVerified: true,
    totalPurchases: 23,
    lastPurchase: '2024-01-13',
  },
  {
    id: 3,
    name: 'Michael Brown',
    age: 36,
    phone: '(555) 345-6789',
    email: 'm.brown@email.com',
    isVerified: false,
    totalPurchases: 12,
    lastPurchase: '2024-01-10',
  },
];

export const Customer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCustomers = mockCustomers.filter(
    customer =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-auto p-6">
      {/* Search and Add Customer */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search customers by name, phone, or email..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:bg-white"
          />
        </div>
        <button className="flex items-center space-x-2 px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <Plus className="w-5 h-5 text-gray-600" />
          <span className="font-medium text-gray-900">Add Customer</span>
        </button>
      </div>

      {/* Customers List */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Customers ({filteredCustomers.length})
        </h3>

        <div className="space-y-4">
          {filteredCustomers.map(customer => (
            <div
              key={customer.id}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">
                    {customer.name}
                  </h4>
                  <p className="text-sm text-gray-500">{customer.age} years</p>
                </div>
                {customer.isVerified && (
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    Verified
                  </span>
                )}
              </div>

              {/* Contact Information */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {customer.phone}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {customer.email}
                  </span>
                </div>
              </div>

              {/* Purchase Summary */}
              <div className="border-t border-gray-100 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {customer.totalPurchases} purchases
                    </p>
                    <p className="text-xs text-gray-500">
                      Last purchase: {customer.lastPurchase}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button className="flex items-center space-x-2 px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <Users className="w-5 h-5 text-gray-600" />
          <span className="font-medium text-gray-900">Guest Purchase</span>
        </button>
        <button className="flex items-center space-x-2 px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <Calendar className="w-5 h-5 text-gray-600" />
          <span className="font-medium text-gray-900">View History</span>
        </button>
      </div>
    </div>
  );
};
