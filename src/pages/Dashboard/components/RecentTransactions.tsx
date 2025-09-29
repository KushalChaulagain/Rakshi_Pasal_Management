import { Eye, Receipt } from 'lucide-react';
import React from 'react';

interface Transaction {
  id: string;
  customerName: string;
  transactionNumber: string;
  time: string;
  amount: number;
  items: number;
  status: 'completed' | 'pending' | 'refunded';
}

const transactions: Transaction[] = [
  {
    id: '1',
    customerName: 'John Doe',
    transactionNumber: 'TXN001',
    time: '2:45 PM',
    amount: 45.99,
    items: 3,
    status: 'completed',
  },
  {
    id: '2',
    customerName: 'Sarah Wilson',
    transactionNumber: 'TXN002',
    time: '2:30 PM',
    amount: 127.50,
    items: 8,
    status: 'completed',
  },
  {
    id: '3',
    customerName: 'Mike Johnson',
    transactionNumber: 'TXN003',
    time: '2:15 PM',
    amount: 89.25,
    items: 5,
    status: 'completed',
  },
  {
    id: '4',
    customerName: 'Lisa Brown',
    transactionNumber: 'TXN004',
    time: '1:58 PM',
    amount: 234.00,
    items: 12,
    status: 'completed',
  },
  {
    id: '5',
    customerName: 'Robert Davis',
    transactionNumber: 'TXN005',
    time: '1:42 PM',
    amount: 67.75,
    items: 4,
    status: 'completed',
  },
];

export const RecentTransactions: React.FC = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
        <button className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
          View All
        </button>
      </div>

      <div className="space-y-3">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {/* Transaction Icon & Info */}
            <div className="flex items-center space-x-4 flex-1">
              <div className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                <Receipt className="w-5 h-5 text-gray-600" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900">{transaction.customerName}</h4>
                <p className="text-sm text-gray-500">
                  {transaction.transactionNumber} • {transaction.time}
                </p>
              </div>
            </div>

            {/* Amount & Items */}
            <div className="text-right mr-4">
              <p className="font-bold text-gray-900">${transaction.amount.toFixed(2)}</p>
              <p className="text-sm text-gray-500">{transaction.items} items</p>
            </div>

            {/* Status & Action */}
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                {transaction.status}
              </span>
              <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                <Eye className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
