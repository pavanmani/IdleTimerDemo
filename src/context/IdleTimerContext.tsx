import React, { useState, useCallback, type ReactNode } from 'react';
import type { IdleTimerContextType, ComponentCallbacks } from '../types/idle-timer.types';
import { IdleTimerContext } from './UseIdleTimerContext';

interface IdleTimerProviderProps {
  children: ReactNode;
}

export const IdleTimerProvider: React.FC<IdleTimerProviderProps> = ({ children }) => {
  const [activeComponent, setActiveComponent] = useState<string | null>(null);
  const [componentCallbacks, setComponentCallbacks] = useState<Record<string, ComponentCallbacks>>({});

  const registerComponent = useCallback((componentId: string, callbacks: ComponentCallbacks) => {
    setComponentCallbacks(prev => ({
      ...prev,
      [componentId]: callbacks
    }));
  }, []);

  const unregisterComponent = useCallback((componentId: string) => {
    setComponentCallbacks(prev => {
      const { [componentId]: removed, ...rest } = prev;
      return rest;
    });
  }, []);

  const setActive = useCallback((componentId: string) => {
    setActiveComponent(componentId);
  }, []);

  const getActiveComponentCallbacks = useCallback((): ComponentCallbacks | null => {
    return activeComponent ? componentCallbacks[activeComponent] || null : null;
  }, [activeComponent, componentCallbacks]);

  const value: IdleTimerContextType = {
    activeComponent,
    registerComponent,
    unregisterComponent,
    setActive,
    getActiveComponentCallbacks
  };

  return (
    <IdleTimerContext.Provider value={value}>
      {children}
    </IdleTimerContext.Provider>
  );
};