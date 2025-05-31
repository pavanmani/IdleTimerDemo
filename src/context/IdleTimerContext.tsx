import React, { createContext, useContext, useState, type ReactNode } from 'react';
import {type IdleTimerContextType, IdleState } from '../types/idle-timer.types';
import IdleTimerManager from '../components/IdleTimerManager';
interface IdleTimerProviderProps {
  children: ReactNode;
}

const IdleTimerContext = createContext<IdleTimerContextType | undefined>(undefined);

export const useIdleTimer = (): IdleTimerContextType => {
  const context = useContext(IdleTimerContext);
  if (!context) {
    throw new Error('useIdleTimer must be used within IdleTimerProvider');
  }
  return context;
};

export const IdleTimerProvider: React.FC<IdleTimerProviderProps> = ({ children }) => {
  const [idleState, setIdleState] = useState<IdleState>(IdleState.ACTIVE);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [resetFunction, setResetFunction] = useState<(() => void) | null>(null);
  const [pauseFunction, setPauseFunction] = useState<(() => void) | null>(null);
  const [resumeFunction, setResumeFunction] = useState<(() => void) | null>(null);

  const value: IdleTimerContextType = {
    idleState,
    timeRemaining,
    reset: () => resetFunction?.(),
    pause: () => pauseFunction?.(),
    resume: () => resumeFunction?.()
  };

  // Internal method to update state from IdleTimerManager
  const updateIdleState = (state: IdleState, remaining: number) => {
    setIdleState(state);
    setTimeRemaining(remaining);
  };

  const setControlFunctions = (reset: () => void, pause: () => void, resume: () => void) => {
    setResetFunction(() => reset);
    setPauseFunction(() => pause);
    setResumeFunction(() => resume);
  };

  return (
    <IdleTimerContext.Provider value={value}>
      <IdleTimerManager 
        onStateChange={updateIdleState} 
        onControlFunctionsReady={setControlFunctions}
      />
      {children}
    </IdleTimerContext.Provider>
  );
};