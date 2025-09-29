import { TrendingUp, Wine } from 'lucide-react';
import React from 'react';

interface Product {
  id: number;
  name: string;
  category: string;
  revenue: number;
  units: number;
  trend: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "Jack Daniel's Tennessee Whiskey 750ml",
    category: 'Whiskey',
    revenue: 2025.00,
    units: 45,
    trend: 12,
  },
  {
    id: 2,
    name: 'Budweiser 12-Pack',
    category: 'Beer',
    revenue: 456.00,
    units: 38,
    trend: 8,
  },
  {
    id: 3,
    name: 'Grey Goose Vodka 750ml',
    category: 'Vodka',
    revenue: 1920.00,
    units: 32,
    trend: 5,
  },
  {
    id: 4,
    name: 'Corona Extra 12-Pack',
    category: 'Beer',
    revenue: 532.00,
    units: 28,
    trend: -2,
  },
  {
    id: 5,
    name: 'Hennessy VSOP Cognac',
    category: 'Cognac',
    revenue: 2880.00,
    units: 24,
    trend: 15,
  },
];

export const TopSellingProducts: React.FC = () => {
  // Calculate the maximum revenue for progress bar scaling
  const maxRevenue = Math.max(...products.map(p => p.revenue));

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-gray-700" />
          <h3 className="text-lg font-semibold text-gray-900">Top Selling Products</h3>
        </div>
      </div>

      <div className="space-y-4">
        {products.map((product, index) => {
          const progressPercentage = (product.revenue / maxRevenue) * 100;
          
          return (
            <div key={product.id} className="space-y-2">
              <div className="flex items-center space-x-4">
                {/* Rank */}
                <div className="flex-shrink-0 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                  {index + 1}
                </div>

                {/* Product Icon */}
                <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Wine className="w-5 h-5 text-gray-600" />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 truncate">{product.name}</h4>
                  <p className="text-sm text-gray-500">{product.category}</p>
                </div>

                {/* Revenue & Trend */}
                <div className="text-right">
                  <p className="font-bold text-gray-900">${product.revenue.toFixed(2)}</p>
                  <p className="text-xs text-gray-500">{product.units} units</p>
                </div>

                {/* Trend Badge */}
                <div className="flex-shrink-0">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      product.trend >= 0
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {product.trend >= 0 ? '+' : ''}{product.trend}%
                  </span>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="ml-14 mr-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gray-800 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-500 text-center">Based on last 30 days sales performance</p>
      </div>
    </div>
  );
};
