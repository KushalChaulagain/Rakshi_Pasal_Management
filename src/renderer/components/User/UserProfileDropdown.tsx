import React, { useState } from 'react';

interface MenuItem {
  id: string;
  label: string;
  onClick: () => void;
}

export const UserProfileDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems: MenuItem[] = [
    {
      id: 'profile',
      label: 'Profile Settings',
      onClick: () => {
        console.log('Profile Settings clicked');
        setIsOpen(false);
      },
    },
    {
      id: 'password',
      label: 'Change Password',
      onClick: () => {
        console.log('Change Password clicked');
        setIsOpen(false);
      },
    },
    {
      id: 'signout',
      label: 'Sign Out',
      onClick: () => {
        console.log('Sign Out clicked');
        setIsOpen(false);
      },
    },
  ];

  return (
    <div className="relative">
      {/* User Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center font-semibold hover:shadow-md transition-all duration-200"
      >
        KD
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl border border-gray-200 shadow-lg z-20 overflow-hidden">
            {/* User Info Section */}
            <div className="px-6 py-5 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
              <div className="flex items-center space-x-3">
                {/* Avatar */}
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-sm">
                  KD
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-gray-900 truncate">
                    Kunjan Dahal
                  </h3>
                  <p className="text-sm text-gray-600 truncate">
                    Store Manager
                  </p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              {menuItems.map((item, index) => (
                <div key={item.id}>
                  <button
                    onClick={item.onClick}
                    className="w-full text-left px-6 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 flex items-center group"
                  >
                    <span className="group-hover:text-gray-900 transition-colors">
                      {item.label}
                    </span>
                  </button>
                  {index === menuItems.length - 2 && (
                    <div className="mx-6 border-b border-gray-100" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
