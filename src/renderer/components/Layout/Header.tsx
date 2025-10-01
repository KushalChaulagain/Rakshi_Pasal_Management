import { Search } from 'lucide-react';
import React from 'react';
import { NotificationDropdown } from '../Notifications/NotificationDropdown';
import { UserProfileDropdown } from '../User/UserProfileDropdown';

export const Header: React.FC = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      {/* Search Bar */}
      <div className="flex-1 max-w-2xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search products, customers, transactions..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center space-x-4 ml-6">
        {/* Notifications */}
        <NotificationDropdown />

        {/* User Profile Dropdown */}
        <UserProfileDropdown />
      </div>
    </header>
  );
};
