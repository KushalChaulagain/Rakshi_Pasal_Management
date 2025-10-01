import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const weeklyData = [
  { day: 'Mon', sales: 2400, transactions: 45 },
  { day: 'Tue', sales: 1398, transactions: 32 },
  { day: 'Wed', sales: 9800, transactions: 78 },
  { day: 'Thu', sales: 3908, transactions: 56 },
  { day: 'Fri', sales: 4800, transactions: 67 },
  { day: 'Sat', sales: 3800, transactions: 54 },
  { day: 'Sun', sales: 4300, transactions: 48 },
];

export const WeeklySalesChart: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-lg hover:border-gray-300 transition-all duration-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Weekly Sales</h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-gray-600">Sales ($)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-600">Transactions</span>
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={weeklyData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="day" stroke="#6b7280" fontSize={12} />
            <YAxis stroke="#6b7280" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
            />
            <Bar
              dataKey="sales"
              fill="#3b82f6"
              radius={[4, 4, 0, 0]}
              name="Sales ($)"
            />
            <Bar
              dataKey="transactions"
              fill="#10b981"
              radius={[4, 4, 0, 0]}
              name="Transactions"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-2xl font-bold text-gray-900">$28,406</p>
          <p className="text-sm text-gray-500">Total Sales</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900">380</p>
          <p className="text-sm text-gray-500">Total Transactions</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900">$74.75</p>
          <p className="text-sm text-gray-500">Avg. Transaction</p>
        </div>
      </div>
    </div>
  );
};
