import { app, BrowserWindow, screen } from 'electron';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { config } from '../../shared/config';
import { Logger } from '../utils/Logger';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to get the correct preload path
function getPreloadPath(): string {
  if (config.isDev) {
    // In development, try multiple possible paths
    const devPaths = [
      path.join(__dirname, '../../preload.mjs'),
      path.join(__dirname, '../preload.mjs'),
      path.join(__dirname, 'preload.mjs'),
    ];

    for (const devPath of devPaths) {
      if (existsSync(devPath)) {
        return devPath;
      }
    }

    // Fallback to the most likely path
    return path.join(__dirname, '../../preload.mjs');
  }

  // In production, try multiple possible paths based on vite-plugin-electron output
  const possiblePaths = [
    path.join(
      process.resourcesPath,
      'app.asar.unpacked',
      'dist-electron',
      'preload.mjs'
    ),
    path.join(
      process.resourcesPath,
      'app.asar.unpacked',
      'dist-electron',
      'preload.js'
    ),
    path.join(
      process.resourcesPath,
      'app.asar.unpacked',
      'dist-electron',
      'preload',
      'preload.js'
    ),
    path.join(__dirname, 'preload.mjs'),
    path.join(__dirname, 'preload.js'),
    path.join(__dirname, 'preload', 'preload.js'),
  ];

  // Return the first path that exists, or fallback to the first one
  for (const preloadPath of possiblePaths) {
    try {
      if (existsSync(preloadPath)) {
        return preloadPath;
      }
    } catch (error) {
      // Continue to next path
    }
  }

  // Fallback to the most likely path (vite-plugin-electron outputs to dist-electron/preload.js)
  return possiblePaths[0];
}

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

      // Log preload path for debugging
      const preloadPath = getPreloadPath();
      this.logger.info('Using preload path:', preloadPath);
      this.logger.info('Process resources path:', process.resourcesPath);
      this.logger.info('__dirname:', __dirname);

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
          preload: getPreloadPath(),
          webSecurity: false, // Allow loading local resources in production
          allowRunningInsecureContent: true,
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
      if (config.isDev) {
        // In development, load from Vite dev server
        const devServerUrl = 'http://localhost:5173/';
        this.logger.info('Loading from Vite dev server:', devServerUrl);
        await this.mainWindow.loadURL(devServerUrl);
      } else {
        // In production, load from built files
        // For packaged apps, we need to use the correct path to access files in app.asar
        // The dist folder is packaged in app.asar at the root level
        this.logger.info('__dirname:', __dirname);
        this.logger.info('process.resourcesPath:', process.resourcesPath);
        this.logger.info('Config isDev:', config.isDev);
        this.logger.info('Process executable path:', process.execPath);
        this.logger.info(
          'App is packaged:',
          process.env.NODE_ENV === 'production' ||
            process.mainModule !== undefined
        );

        // For packaged apps, use app.getAppPath() which handles asar files correctly
        const appPath = app.getAppPath();
        this.logger.info('App path:', appPath);

        const indexPath = path.join(appPath, 'dist', 'index.html');
        this.logger.info('Final index path:', indexPath);
        this.logger.info('Index exists:', existsSync(indexPath));

        try {
          await this.mainWindow.loadFile(indexPath);
          this.logger.info('Successfully loaded index.html from:', indexPath);
        } catch (loadError) {
          this.logger.error('Failed to load from app path:', loadError);

          // Fallback: try loading with URL format
          try {
            const fileUrl = `file://${indexPath.replace(/\\/g, '/')}`;
            this.logger.info('Trying URL format:', fileUrl);
            await this.mainWindow.loadURL(fileUrl);
            this.logger.info('Successfully loaded with URL format');
          } catch (urlError) {
            this.logger.error('Failed to load with URL format:', urlError);
            throw urlError;
          }
        }
      }
    } catch (error) {
      this.logger.error('Failed to load application:', error);
      this.handleLoadError();
    }
  }

  private handleLoadError(): void {
    if (config.isDev) {
      // Retry loading after a delay in development
      setTimeout(() => {
        if (this.mainWindow) {
          this.mainWindow.loadURL('http://localhost:5173/');
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
