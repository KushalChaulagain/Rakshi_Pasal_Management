import {
  AlertTriangle,
  BarChart3,
  Barcode,
  CreditCard,
  FileText,
  FileWarning,
  HardDrive,
  Home,
  Package,
  Settings,
  ShoppingCart,
  TrendingUp,
  UserCheck,
  UserCog,
  TruckIcon,
  Wine,
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
    <NavLink to={to} end={to === '/inventory'}>
      {({ isActive }) => (
        <div
          className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
            isActive
              ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-900 font-semibold shadow-sm'
              : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 font-medium'
          }`}
        >
          <div className="flex items-center space-x-3">
            <div
              className={`w-5 h-5 flex items-center justify-center ${isActive ? 'text-blue-600' : 'text-gray-500'}`}
            >
              {icon}
            </div>
            <span className="text-base font-medium">{label}</span>
          </div>
          {badge && (
            <span
              className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                isActive ? 'bg-red-500 text-white' : 'bg-red-100 text-red-700'
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
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm">
      {/* Logo */}
      <div className="h-20 flex items-center px-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
            <Wine className="w-6 h-6 text-gray-700" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Liquor Store</h1>
            <p className="text-sm text-gray-500">Management System</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-8 overflow-y-auto">
        {/* Main Section */}
        <div>
          <h3 className="px-4 mb-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Main
          </h3>
          <div className="space-y-1">
            <NavItem to="/dashboard" icon={<Home />} label="Dashboard" />
            <NavItem to="/pos" icon={<ShoppingCart />} label="Point of Sale" />
          </div>
        </div>

        {/* Inventory Management */}
        <div>
          <h3 className="px-4 mb-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Inventory Management
          </h3>
          <div className="space-y-1">
            <NavItem
              to="/inventory"
              icon={<Package />}
              label="Product Catalog"
            />
            <NavItem
              to="/inventory/stock"
              icon={<Wine />}
              label="Stock Management"
            />
            <NavItem
              to="/inventory/alerts"
              icon={<AlertTriangle />}
              label="Low Stock Alerts"
              badge="23"
            />
            <NavItem
              to="/inventory/suppliers"
              icon={<TruckIcon />}
              label="Suppliers"
            />
            <NavItem
              to="/inventory/scanner"
              icon={<Barcode />}
              label="Barcode Scanner"
            />
          </div>
        </div>

        {/* Sales & Customers */}
        <div>
          <h3 className="px-4 mb-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Sales & Customers
          </h3>
          <div className="space-y-1">
            <NavItem
              to="/sales/transactions"
              icon={<CreditCard />}
              label="Transactions"
            />
            <NavItem
              to="/sales/customers"
              icon={<UserCheck />}
              label="Customer Management"
            />
            <NavItem
              to="/sales/age-verification"
              icon={<UserCog />}
              label="Age Verification"
            />
          </div>
        </div>

        {/* Reports & Analytics */}
        <div>
          <h3 className="px-4 mb-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Reports & Analytics
          </h3>
          <div className="space-y-1">
            <NavItem
              to="/reports/sales"
              icon={<FileText />}
              label="Sales Reports"
            />
            <NavItem
              to="/reports/profitability"
              icon={<BarChart3 />}
              label="Profitability Analysis"
            />
            <NavItem
              to="/reports/inventory"
              icon={<FileWarning />}
              label="Inventory Reports"
            />
            <NavItem
              to="/reports/trends"
              icon={<TrendingUp />}
              label="Trend Analysis"
            />
          </div>
        </div>

        {/* Administration */}
        <div>
          <h3 className="px-4 mb-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Administration
          </h3>
          <div className="space-y-1">
            <NavItem
              to="/admin/users"
              icon={<UserCog />}
              label="User Management"
            />
            <NavItem
              to="/admin/settings"
              icon={<Settings />}
              label="System Settings"
            />
            <NavItem
              to="/admin/backup"
              icon={<HardDrive />}
              label="Data Backup"
            />
            <NavItem
              to="/admin/audit"
              icon={<FileText />}
              label="Audit Trail"
            />
          </div>
        </div>
      </nav>
    </aside>
  );
};
