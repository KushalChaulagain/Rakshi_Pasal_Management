import {
  AlertTriangle,
  CheckCircle,
  Filter,
  Package,
  Truck,
} from 'lucide-react';
import React, { useState } from 'react';
import { AlertFilters, AlertSummary, StockAlert } from '../../../shared/types';
import { AlertSummaryCard, AlertTable, SearchAndFilters } from './components';

// Mock data - in real app this would come from API
const mockAlertSummary: AlertSummary = {
  critical: 2,
  highPriority: 1,
  outOfStock: 1,
  resolvedToday: 12,
};

const mockAlerts: StockAlert[] = [
  {
    id: '1',
    productId: 'prod-1',
    productName: "Jack Daniel's Tennessee Whiskey 750ml",
    sku: 'SKU001',
    category: 'Whiskey',
    currentStock: 3,
    minStock: 10,
    maxStock: 50,
    priority: 'critical',
    supplier: 'Brown-Forman',
    lastRestockDate: new Date('2024-01-10'),
    daysUntilOut: 2,
    isOutOfStock: false,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    productId: 'prod-2',
    productName: 'Grey Goose Vodka 750ml',
    sku: 'SKU002',
    category: 'Vodka',
    currentStock: 5,
    minStock: 15,
    maxStock: 60,
    priority: 'high',
    supplier: 'Bacardi Limited',
    lastRestockDate: new Date('2024-01-08'),
    daysUntilOut: 7,
    isOutOfStock: false,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '3',
    productId: 'prod-3',
    productName: 'Corona Extra 12-Pack',
    sku: 'SKU003',
    category: 'Beer',
    currentStock: 0,
    minStock: 20,
    maxStock: 100,
    priority: 'critical',
    supplier: 'Constellation Brands',
    lastRestockDate: new Date('2023-12-28'),
    daysUntilOut: 0,
    isOutOfStock: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '4',
    productId: 'prod-4',
    productName: 'Dom Perignon Champagne 750ml',
    sku: 'SKU005',
    category: 'Champagne',
    currentStock: 2,
    minStock: 5,
    maxStock: 20,
    priority: 'medium',
    supplier: 'LVMH',
    lastRestockDate: new Date('2023-12-15'),
    daysUntilOut: 14,
    isOutOfStock: false,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
];

export const LowStockAlerts: React.FC = () => {
  const [filters, setFilters] = useState<AlertFilters>({
    search: '',
    priority: 'all',
    category: 'all',
  });

  const handleConfigureAlerts = () => {
    // TODO: Implement configure alerts functionality
    console.log('Configure alerts clicked');
  };

  const handleBulkRestock = () => {
    // TODO: Implement bulk restock functionality
    console.log('Bulk restock clicked');
  };

  const handleQuickAdd = (alertId: string) => {
    // TODO: Implement quick add functionality
    console.log('Quick add for alert:', alertId);
  };

  const handleOrder = (alertId: string) => {
    // TODO: Implement order functionality
    console.log('Order for alert:', alertId);
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Low Stock Alerts
            </h1>
          </div>
          <p className="text-gray-600">
            Monitor and manage products that are running low on inventory.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleConfigureAlerts}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span>Configure Alerts</span>
          </button>
          <button
            onClick={handleBulkRestock}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Truck className="w-4 h-4" />
            <span>Bulk Restock</span>
          </button>
        </div>
      </div>

      {/* Alert Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AlertSummaryCard
          title="Critical Alerts"
          count={mockAlertSummary.critical}
          icon={<AlertTriangle className="w-6 h-6" />}
          color="red"
        />
        <AlertSummaryCard
          title="High Priority"
          count={mockAlertSummary.highPriority}
          icon={<AlertTriangle className="w-6 h-6" />}
          color="orange"
        />
        <AlertSummaryCard
          title="Out of Stock"
          count={mockAlertSummary.outOfStock}
          icon={<Package className="w-6 h-6" />}
          color="blue"
        />
        <AlertSummaryCard
          title="Resolved Today"
          count={mockAlertSummary.resolvedToday}
          icon={<CheckCircle className="w-6 h-6" />}
          color="green"
        />
      </div>

      {/* Search and Filters */}
      <SearchAndFilters filters={filters} onFiltersChange={setFilters} />

      {/* Active Alerts Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Active Alerts ({mockAlerts.length})
        </h2>
        <AlertTable
          alerts={mockAlerts}
          onQuickAdd={handleQuickAdd}
          onOrder={handleOrder}
        />
      </div>
    </div>
  );
};
