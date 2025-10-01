import {
  AlertTriangle,
  DollarSign,
  Package,
  ShoppingCart,
  TrendingUp,
  Users,
} from 'lucide-react';
import React from 'react';
import { DashboardCard } from './components/DashboardCard';
import { LowStockAlerts } from './components/LowStockAlerts';
import { QuickActions } from './components/QuickActions';
import { RecentTransactions } from './components/RecentTransactions';
import { TopSellingProducts } from './components/TopSellingProducts';
import { WeeklySalesChart } from './components/WeeklySalesChart';

export const Dashboard: React.FC = () => {
  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome back! Here's what's happening at your store today.
        </p>
      </div>

      {/* KPI Cards Grid - 3x2 Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          title="Today's Sales"
          value="$2,847.50"
          icon={<DollarSign className="w-8 h-8" />}
          trend={{ value: '+12.5%', isPositive: true }}
          subtitle="Compared to yesterday"
        />
        <DashboardCard
          title="Total Inventory Value"
          value="$45,230.00"
          icon={<Package className="w-8 h-8" />}
          trend={{ value: '+2.3%', isPositive: true }}
          subtitle="Current stock value"
        />
        <DashboardCard
          title="Transactions Today"
          value="127"
          icon={<ShoppingCart className="w-8 h-8" />}
          trend={{ value: '+8.2%', isPositive: true }}
          subtitle="Sales transactions"
        />
        <DashboardCard
          title="Active Customers"
          value="1,247"
          icon={<Users className="w-8 h-8" />}
          trend={{ value: '+5.1%', isPositive: true }}
          subtitle="Registered customers"
        />
        <DashboardCard
          title="Low Stock Items"
          value="23"
          icon={<AlertTriangle className="w-8 h-8" />}
          trend={{ value: '+3', isPositive: false }}
          subtitle="Items below threshold"
        />
        <DashboardCard
          title="Monthly Revenue"
          value="$78,450.00"
          icon={<TrendingUp className="w-8 h-8" />}
          trend={{ value: '+15.8%', isPositive: true }}
          subtitle="This month's total"
        />
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Charts and Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeeklySalesChart />
        <TopSellingProducts />
      </div>

      {/* Recent Transactions and Low Stock Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentTransactions />
        <LowStockAlerts />
      </div>
    </div>
  );
};
