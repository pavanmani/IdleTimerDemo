import { useEffect, useCallback } from 'react';
import { useIdleTimerContext } from '../context/UseIdleTimerContext';
import type { ComponentCallbacks } from '../types/idle-timer.types';

interface UseComponentIdleTimerReturn {
  setAsActive: () => void;
}

export const useComponentIdleTimer = (
  componentId: string, 
  callbacks: ComponentCallbacks
): UseComponentIdleTimerReturn => {
  const { registerComponent, unregisterComponent, setActive } = useIdleTimerContext();

  const onPreLogout = useCallback(async (): Promise<void> => {
    if (callbacks.onPreLogout) {
      await callbacks.onPreLogout();
    }
  }, [callbacks]);

  const onLogout = useCallback(async (): Promise<void> => {
    if (callbacks.onLogout) {
      await callbacks.onLogout();
    }
  }, [callbacks]);

  useEffect(() => {
    registerComponent(componentId, {
      onPreLogout,
      onLogout
    });

    return () => {
      unregisterComponent(componentId);
    };
  }, [componentId, registerComponent, unregisterComponent, onPreLogout, onLogout]);

  const setAsActive = useCallback((): void => {
    setActive(componentId);
  }, [componentId, setActive]);

  return { setAsActive };
};