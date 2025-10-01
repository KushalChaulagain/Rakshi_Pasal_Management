import { BrowserWindow, ipcMain } from 'electron';
import { IpcMessage } from '../../shared/types';
import { Logger } from '../utils/Logger';

export class IpcManager {
  private logger = new Logger('IpcManager');

  initialize(): void {
    this.logger.info('Initializing IPC handlers...');

    // Register IPC handlers
    this.registerAppHandlers();
    this.registerWindowHandlers();
    this.registerDataHandlers();

    this.logger.info('IPC handlers initialized successfully');
  }

  private registerAppHandlers(): void {
    // App info
    ipcMain.handle('app:get-info', () => {
      return {
        name: 'Liquor Store Management System',
        version: '1.0.1',
        platform: process.platform,
        arch: process.arch,
      };
    });

    // App version
    ipcMain.handle('app:get-version', () => {
      return '1.0.1';
    });

    // Platform info
    ipcMain.handle('app:get-platform', () => {
      return process.platform;
    });
  }

  private registerWindowHandlers(): void {
    // Minimize window
    ipcMain.handle('window:minimize', () => {
      const focusedWindow = BrowserWindow.getFocusedWindow();
      if (focusedWindow) {
        focusedWindow.minimize();
      }
    });

    // Maximize/Restore window
    ipcMain.handle('window:toggle-maximize', () => {
      const focusedWindow = BrowserWindow.getFocusedWindow();
      if (focusedWindow) {
        if (focusedWindow.isMaximized()) {
          focusedWindow.unmaximize();
        } else {
          focusedWindow.maximize();
        }
      }
    });

    // Close window
    ipcMain.handle('window:close', () => {
      const focusedWindow = BrowserWindow.getFocusedWindow();
      if (focusedWindow) {
        focusedWindow.close();
      }
    });

    // Check if window is maximized
    ipcMain.handle('window:is-maximized', () => {
      const focusedWindow = BrowserWindow.getFocusedWindow();
      return focusedWindow ? focusedWindow.isMaximized() : false;
    });
  }

  private registerDataHandlers(): void {
    // Example: Get products (placeholder for future backend integration)
    ipcMain.handle('data:get-products', async () => {
      try {
        // This would typically connect to your backend API
        // For now, return mock data
        return {
          success: true,
          data: [],
          message: 'Products retrieved successfully',
        };
      } catch (error) {
        this.logger.error('Failed to get products:', error);
        return {
          success: false,
          data: null,
          error: 'Failed to retrieve products',
        };
      }
    });

    // Example: Save transaction (placeholder for future backend integration)
    ipcMain.handle('data:save-transaction', async (_, transactionData) => {
      try {
        this.logger.info('Saving transaction:', transactionData);

        // This would typically save to your backend API
        // For now, just log the data
        return {
          success: true,
          data: { id: Date.now().toString(), ...transactionData },
          message: 'Transaction saved successfully',
        };
      } catch (error) {
        this.logger.error('Failed to save transaction:', error);
        return {
          success: false,
          data: null,
          error: 'Failed to save transaction',
        };
      }
    });
  }

  // Generic message handler for extensibility
  public handleMessage<T>(message: IpcMessage<T>): unknown {
    this.logger.info('Handling IPC message:', message.type);

    // Add your custom message handling logic here
    switch (message.type) {
      case 'ping':
        return { success: true, data: 'pong' };
      default:
        this.logger.warn('Unknown message type:', message.type);
        return { success: false, error: 'Unknown message type' };
    }
  }
}
