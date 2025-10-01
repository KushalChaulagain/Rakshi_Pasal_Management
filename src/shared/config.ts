/**
 * Shared configuration for both main and renderer processes
 */

export interface AppConfig {
  isDev: boolean;
  isProduction: boolean;
  apiUrl: string;
  appVersion: string;
  appName: string;
  window: {
    width: number;
    height: number;
    minWidth: number;
    minHeight: number;
  };
}

export const config: AppConfig = {
  isDev: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  apiUrl: process.env.VITE_API_URL || 'http://localhost:5000/api',
  appVersion: process.env.npm_package_version || '1.0.1',
  appName: 'Liquor Store Management System',
  window: {
    width: 1366,
    height: 768,
    minWidth: 1280,
    minHeight: 720,
  },
};

export default config;
