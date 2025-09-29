// TypeScript types for window.electron
export interface IElectronAPI {
  platform: string;
}

declare global {
  interface Window {
    electron: IElectronAPI;
  }
}

export { };

