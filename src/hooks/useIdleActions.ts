import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useIdleTimer } from '../context/IdleTimerContext';
import { IdleState } from '../types/idle-timer.types';

interface IdleActions {
  onWarning?: () => Promise<void> | void;
  onIdle?: () => Promise<void> | void;
}

export const useIdleActions = (actions: IdleActions) => {
  const { idleState } = useIdleTimer();
  const location = useLocation();

  useEffect(() => {
    const executeAction = async () => {
      try {
        if (idleState === IdleState.WARNING && actions.onWarning) {
          await actions.onWarning();
        } else if (idleState === IdleState.IDLE && actions.onIdle) {
          await actions.onIdle();
        }
      } catch (error) {
        console.error(`Error executing idle action for ${location.pathname}:`, error);
      }
    };

    executeAction();
  }, [idleState, actions, actions.onWarning, actions.onIdle, location.pathname]);

  return {
    idleState,
    isWarning: idleState === IdleState.WARNING,
    isIdle: idleState === IdleState.IDLE,
    isActive: idleState === IdleState.ACTIVE
  };
};