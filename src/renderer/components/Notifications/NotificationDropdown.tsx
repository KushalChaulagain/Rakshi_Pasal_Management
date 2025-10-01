import {
  AlertTriangle,
  Bell,
  CheckCircle,
  Clock,
  ShoppingBag,
} from 'lucide-react';
import React, { useState } from 'react';

interface Notification {
  id: string;
  title: string;
  description: string;
  type: 'info' | 'warning' | 'success';
  timestamp?: string;
  unread?: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Low Stock Alert',
    description: '5 products are running low on stock',
    type: 'warning',
    timestamp: '2 minutes ago',
    unread: true,
  },
  {
    id: '2',
    title: 'New Order Received',
    description: 'Order #1234 from ABC Distributors',
    type: 'info',
    timestamp: '15 minutes ago',
    unread: true,
  },
  {
    id: '3',
    title: 'System Backup Complete',
    description: 'Daily backup completed successfully',
    type: 'success',
    timestamp: '1 hour ago',
    unread: false,
  },
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'warning':
      return <AlertTriangle className="w-5 h-5 text-orange-500" />;
    case 'success':
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    case 'info':
      return <ShoppingBag className="w-5 h-5 text-blue-500" />;
    default:
      return <Bell className="w-5 h-5 text-gray-500" />;
  }
};

export const NotificationDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications] = useState<Notification[]>(mockNotifications);

  return (
    <div className="relative">
      {/* Bell Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Bell className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
          {notifications.length}
        </span>
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
          <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl border border-gray-200 shadow-xl z-20 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Notifications
                </h3>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {notifications.filter(n => n.unread).length} new
                  </span>
                </div>
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {notifications.map(notification => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 transition-colors duration-150 border-b border-gray-50 last:border-b-0 ${
                    notification.unread ? 'bg-blue-50/30' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    {/* Icon */}
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        {getNotificationIcon(notification.type)}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4
                            className={`font-medium ${notification.unread ? 'text-gray-900' : 'text-gray-700'}`}
                          >
                            {notification.title}
                            {notification.unread && (
                              <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full inline-block"></span>
                            )}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.description}
                          </p>
                        </div>
                      </div>

                      {/* Timestamp */}
                      {notification.timestamp && (
                        <div className="flex items-center mt-2 text-xs text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          {notification.timestamp}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <button className="w-full text-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                  View All Notifications
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
