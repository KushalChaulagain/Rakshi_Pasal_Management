import { contextBridge } from 'electron';

// Expose safe APIs to renderer process
contextBridge.exposeInMainWorld('electron', {
  platform: process.platform,
  // Add more IPC methods here as needed for barcode scanner, printer, etc.
});

// Export for type checking
export { };

