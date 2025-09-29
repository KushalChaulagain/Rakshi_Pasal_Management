import {
  AlertTriangle,
  BarChart3,
  Barcode,
  CreditCard,
  Database,
  FileText,
  FileWarning,
  HardDrive,
  Home,
  Package,
  Settings,
  ShoppingCart,
  Store,
  TrendingUp,
  UserCheck,
  UserCog,
  Users,
} from 'lucide-react';
import React from 'react';
import { NavLink } from 'react-router-dom';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  badge?: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, badge }) => {
  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <div
          className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${
            isActive
              ? 'bg-gray-100 text-gray-900 font-semibold'
              : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 font-normal'
          }`}
        >
          <div className="flex items-center space-x-3">
            <div className={`w-3.5 h-3.5 flex items-center justify-center ${isActive ? 'text-gray-900' : 'text-gray-600'}`}>
              {icon}
            </div>
            <span className="text-sm">{label}</span>
          </div>
          {badge && (
            <span
              className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                isActive ? 'bg-red-100 text-red-800' : 'bg-red-100 text-red-800'
              }`}
            >
              {badge}
            </span>
          )}
        </div>
      )}
    </NavLink>
  );
};

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-60 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-6">
        <Store className="w-5 h-5 text-gray-900 mr-3" />
        <div>
          <h1 className="text-base font-bold text-gray-900">Liquor Store</h1>
          <p className="text-xs text-gray-500">Management System</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-6 overflow-y-auto">
        {/* Main Section */}
        <div>
          <h3 className="px-3 mb-2 text-xs font-medium text-gray-500 uppercase ">
            Main
          </h3>
          <div className="space-y-0.5">
            <NavItem to="/dashboard" icon={<Home />} label="Dashboard" />
            <NavItem to="/pos" icon={<ShoppingCart />} label="Point of Sale" />
          </div>
        </div>

        {/* Inventory Management */}
        <div>
          <h3 className="px-3 mb-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
            Inventory Management
          </h3>
          <div className="space-y-0.5">
            <NavItem to="/inventory" icon={<Package />} label="Product Catalog" />
            <NavItem to="/inventory/stock" icon={<Database />} label="Stock Management" />
            <NavItem to="/inventory/alerts" icon={<AlertTriangle />} label="Low Stock Alerts" badge="23" />
            <NavItem to="/inventory/suppliers" icon={<Users />} label="Suppliers" />
            <NavItem to="/inventory/scanner" icon={<Barcode />} label="Barcode Scanner" />
          </div>
        </div>

        {/* Sales & Customers */}
        <div>
          <h3 className="px-3 mb-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
            Sales & Customers
          </h3>
          <div className="space-y-0.5">
            <NavItem to="/sales/transactions" icon={<CreditCard />} label="Transactions" />
            <NavItem to="/sales/customers" icon={<UserCheck />} label="Customer Management" />
            <NavItem to="/sales/age-verification" icon={<UserCog />} label="Age Verification" />
          </div>
        </div>

        {/* Reports & Analytics */}
        <div>
          <h3 className="px-3 mb-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
            Reports & Analytics
          </h3>
          <div className="space-y-0.5">
            <NavItem to="/reports/sales" icon={<FileText />} label="Sales Reports" />
            <NavItem to="/reports/profitability" icon={<BarChart3 />} label="Profitability Analysis" />
            <NavItem to="/reports/inventory" icon={<FileWarning />} label="Inventory Reports" />
            <NavItem to="/reports/trends" icon={<TrendingUp />} label="Trend Analysis" />
          </div>
        </div>

        {/* Administration */}
        <div>
          <h3 className="px-3 mb-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
            Administration
          </h3>
          <div className="space-y-0.5">
            <NavItem to="/admin/users" icon={<UserCog />} label="User Management" />
            <NavItem to="/admin/settings" icon={<Settings />} label="System Settings" />
            <NavItem to="/admin/backup" icon={<HardDrive />} label="Data Backup" />
            <NavItem to="/admin/audit" icon={<FileText />} label="Audit Trail" />
          </div>
        </div>
      </nav>
    </aside>
  );
};
