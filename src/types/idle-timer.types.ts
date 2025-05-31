export interface ComponentCallbacks {
  onPreLogout?: () => Promise<void> | void;
  onLogout?: () => Promise<void> | void;
}

export interface IdleTimerContextType {
  activeComponent: string | null;
  registerComponent: (componentId: string, callbacks: ComponentCallbacks) => void;
  unregisterComponent: (componentId: string) => void;
  setActive: (componentId: string) => void;
  getActiveComponentCallbacks: () => ComponentCallbacks | null;
}

export interface UseCustomIdleTimerProps {
  onPreLogout?: () => Promise<void> | void;
  onLogout?: () => Promise<void> | void;
  timeout?: number;
  promptTimeout?: number;
}

export interface LogoutWarningModalProps {
  timeRemaining: number;
  onContinue: () => void;
  onLogout: () => void;
}