import { app, BrowserWindow } from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Production-level error handling
process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
  // Log to file or service
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled rejection:', reason);
  // Log to file or service
});

// Keep Electron window reference
let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1366,
    height: 768,
    minWidth: 1280,
    minHeight: 720,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      preload: path.join(__dirname, 'preload.mjs'),
    },
    frame: true,
    backgroundColor: '#f9fafb', // Match app background
    title: 'Liquor Store Management System',
    show: false, // Don't show until ready
  });

  // Show window when ready to avoid visual flash
  mainWindow.once('ready-to-show', () => {
    mainWindow?.show();
    console.log('Application window loaded successfully');
  });

  // Handle page load errors
  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error('Failed to load:', errorCode, errorDescription);
    // Retry loading after a delay
    setTimeout(() => {
      if (mainWindow && process.env.VITE_DEV_SERVER_URL) {
        mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
      }
    }, 2000);
  });

  // In development, load from Vite dev server
  if (process.env.VITE_DEV_SERVER_URL) {
    console.log('Loading from Vite dev server:', process.env.VITE_DEV_SERVER_URL);
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL).catch((error) => {
      console.error('Failed to load URL:', error);
    });
  } else {
    // In production, load from built files
    const indexPath = path.join(__dirname, '../dist/index.html');
    console.log('Loading from file:', indexPath);
    mainWindow.loadFile(indexPath).catch((error) => {
      console.error('Failed to load file:', error);
    });
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Prevent navigation to external URLs
  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (!url.startsWith('http://localhost') && !url.startsWith('file://')) {
      event.preventDefault();
      console.warn('Prevented navigation to:', url);
    }
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // On macOS, re-create window when dock icon is clicked
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed (except on macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Handle app activation events
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
