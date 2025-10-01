import { app, BrowserWindow } from 'electron';
import { IpcManager } from '../ipc/IpcManager';
import { Logger } from '../utils/Logger';
import { WindowManager } from '../windows/WindowManager';

// Initialize logger
const logger = new Logger('Main');

// Production-level error handling
process.on('uncaughtException', error => {
  logger.error('Uncaught exception:', error);
  // In production, you might want to save to file or send to monitoring service
});

process.on('unhandledRejection', reason => {
  logger.error('Unhandled rejection:', reason);
});

class LiquorStoreApp {
  private windowManager: WindowManager;
  private ipcManager: IpcManager;

  constructor() {
    this.windowManager = new WindowManager();
    this.ipcManager = new IpcManager();
  }

  async initialize(): Promise<void> {
    try {
      logger.info('Initializing Liquor Store Management System...');

      // Wait for Electron to be ready
      await app.whenReady();

      // Initialize IPC handlers
      this.ipcManager.initialize();

      // Create main window
      await this.windowManager.createMainWindow();

      logger.info('Application initialized successfully');
    } catch (error) {
      logger.error('Failed to initialize application:', error);
      throw error;
    }
  }

  public setupAppEvents(): void {
    // Quit when all windows are closed (except on macOS)
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });

    // On macOS, re-create window when dock icon is clicked
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        this.windowManager.createMainWindow();
      }
    });

    // Security: Prevent new window creation
    app.on('web-contents-created', (_, contents) => {
      contents.setWindowOpenHandler(({ url }) => {
        logger.warn('Prevented new window creation to:', url);
        return { action: 'deny' };
      });
    });
  }
}

// Create and initialize the application
const liquorStoreApp = new LiquorStoreApp();

// Setup app events
liquorStoreApp.setupAppEvents();

// Initialize the application
liquorStoreApp.initialize().catch(error => {
  logger.error('Application startup failed:', error);
  app.quit();
});

export default liquorStoreApp;
