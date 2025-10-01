import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock Electron APIs for testing
Object.defineProperty(window, 'electronAPI', {
  value: {
    getAppInfo: vi.fn().mockResolvedValue({
      name: 'Liquor Store Management System',
      version: '1.0.1',
      platform: 'win32',
      arch: 'x64',
    }),
    getAppVersion: vi.fn().mockResolvedValue('1.0.1'),
    getPlatform: vi.fn().mockResolvedValue('win32'),
    minimizeWindow: vi.fn().mockResolvedValue(undefined),
    toggleMaximizeWindow: vi.fn().mockResolvedValue(undefined),
    closeWindow: vi.fn().mockResolvedValue(undefined),
    isWindowMaximized: vi.fn().mockResolvedValue(false),
    getProducts: vi.fn().mockResolvedValue({ success: true, data: [] }),
    saveTransaction: vi.fn().mockResolvedValue({ success: true, data: {} }),
    sendMessage: vi.fn().mockResolvedValue({ success: true }),
  },
  writable: true,
});

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  log: vi.fn(),
  debug: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
};
