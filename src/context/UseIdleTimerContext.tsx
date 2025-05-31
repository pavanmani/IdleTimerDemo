import { createContext, useContext } from 'react';
import type { IdleTimerContextType } from '../types/idle-timer.types';

export const IdleTimerContext = createContext<IdleTimerContextType | undefined>(undefined);

export const useIdleTimerContext = (): IdleTimerContextType => {
  const context = useContext(IdleTimerContext);
  if (!context) {
    throw new Error('useIdleTimerContext must be used within IdleTimerProvider');
  }
  return context;
};