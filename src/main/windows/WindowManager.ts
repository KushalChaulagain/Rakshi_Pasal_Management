import { BrowserWindow, screen } from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { config } from '../../shared/config';
import { Logger } from '../utils/Logger';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class WindowManager {
  private mainWindow: BrowserWindow | null = null;
  private logger = new Logger('WindowManager');

  async createMainWindow(): Promise<BrowserWindow> {
    try {
      // Get primary display info for centering
      const primaryDisplay = screen.getPrimaryDisplay();
      const { width: screenWidth, height: screenHeight } =
        primaryDisplay.workAreaSize;

      // Calculate center position
      const x = Math.round((screenWidth - config.window.width) / 2);
      const y = Math.round((screenHeight - config.window.height) / 2);

      this.mainWindow = new BrowserWindow({
        width: config.window.width,
        height: config.window.height,
        minWidth: config.window.minWidth,
        minHeight: config.window.minHeight,
        x,
        y,
        webPreferences: {
          nodeIntegration: false,
          contextIsolation: true,
          sandbox: true,
          preload: path.join(__dirname, '../../preload/preload.js'),
          webSecurity: true,
        },
        frame: true,
        backgroundColor: '#f9fafb',
        title: config.appName,
        show: false, // Don't show until ready
        icon: path.join(__dirname, '../../../build/icon.png'),
      });

      // Show window when ready to avoid visual flash
      this.mainWindow.once('ready-to-show', () => {
        this.mainWindow?.show();
        this.logger.info('Main window loaded successfully');

        // Enable DevTools in development
        if (config.isDev) {
          this.mainWindow?.webContents.openDevTools();
        }
      });

      // Handle page load errors
      this.mainWindow.webContents.on(
        'did-fail-load',
        (_, errorCode, errorDescription) => {
          this.logger.error('Failed to load:', errorCode, errorDescription);
          this.handleLoadError();
        }
      );

      // Load the application
      await this.loadApplication();

      // Prevent navigation to external URLs
      this.mainWindow.webContents.on('will-navigate', (event, url) => {
        if (!this.isAllowedUrl(url)) {
          event.preventDefault();
          this.logger.warn('Prevented navigation to:', url);
        }
      });

      this.mainWindow.on('closed', () => {
        this.mainWindow = null;
      });

      return this.mainWindow;
    } catch (error) {
      this.logger.error('Failed to create main window:', error);
      throw error;
    }
  }

  private async loadApplication(): Promise<void> {
    if (!this.mainWindow) {
      throw new Error('Main window not created');
    }

    try {
      if (config.isDev && process.env.VITE_DEV_SERVER_URL) {
        this.logger.info(
          'Loading from Vite dev server:',
          process.env.VITE_DEV_SERVER_URL
        );
        await this.mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
      } else {
        // In production, load from built files
        const indexPath = path.join(__dirname, '../../../dist/index.html');
        this.logger.info('Loading from file:', indexPath);
        await this.mainWindow.loadFile(indexPath);
      }
    } catch (error) {
      this.logger.error('Failed to load application:', error);
      this.handleLoadError();
    }
  }

  private handleLoadError(): void {
    if (config.isDev && process.env.VITE_DEV_SERVER_URL) {
      // Retry loading after a delay in development
      setTimeout(() => {
        if (this.mainWindow && process.env.VITE_DEV_SERVER_URL) {
          this.mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
        }
      }, 2000);
    }
  }

  private isAllowedUrl(url: string): boolean {
    const allowedProtocols = ['http://localhost', 'file://'];
    return allowedProtocols.some(protocol => url.startsWith(protocol));
  }

  getMainWindow(): BrowserWindow | null {
    return this.mainWindow;
  }

  closeMainWindow(): void {
    if (this.mainWindow) {
      this.mainWindow.close();
    }
  }
}
