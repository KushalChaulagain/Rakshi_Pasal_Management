import { contextBridge, ipcRenderer } from 'electron';
import { IpcMessage } from '../shared/types';

/**
 * Professional preload script that securely exposes APIs to the renderer process
 */

// Define the API interface
interface ElectronAPI {
  // App information
  getAppInfo: () => Promise<{
    name: string;
    version: string;
    platform: string;
  }>;
  getAppVersion: () => Promise<string>;
  getPlatform: () => Promise<string>;

  // Window controls
  minimizeWindow: () => Promise<void>;
  toggleMaximizeWindow: () => Promise<void>;
  closeWindow: () => Promise<void>;
  isWindowMaximized: () => Promise<boolean>;

  // Data operations
  getProducts: () => Promise<unknown>;
  saveTransaction: (transactionData: unknown) => Promise<unknown>;

  // Generic message handler
  sendMessage: <T>(message: IpcMessage<T>) => Promise<unknown>;
}

// Create the API object
const electronAPI: ElectronAPI = {
  // App information
  getAppInfo: () => ipcRenderer.invoke('app:get-info'),
  getAppVersion: () => ipcRenderer.invoke('app:get-version'),
  getPlatform: () => ipcRenderer.invoke('app:get-platform'),

  // Window controls
  minimizeWindow: () => ipcRenderer.invoke('window:minimize'),
  toggleMaximizeWindow: () => ipcRenderer.invoke('window:toggle-maximize'),
  closeWindow: () => ipcRenderer.invoke('window:close'),
  isWindowMaximized: () => ipcRenderer.invoke('window:is-maximized'),

  // Data operations
  getProducts: () => ipcRenderer.invoke('data:get-products'),
  saveTransaction: (transactionData: unknown) =>
    ipcRenderer.invoke('data:save-transaction', transactionData),

  // Generic message handler
  sendMessage: <T>(message: IpcMessage<T>) =>
    ipcRenderer.invoke('message:send', message),
};

// Expose the API to the renderer process
contextBridge.exposeInMainWorld('electronAPI', electronAPI);

// Type declaration for the global window object
declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}

// Log successful preload
console.log('Preload script loaded successfully');
