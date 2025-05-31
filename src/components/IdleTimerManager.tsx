import React, { useCallback, useEffect } from 'react';
import { useIdleTimer as useReactIdleTimer } from 'react-idle-timer';
import { useLocation } from 'react-router-dom';
import { IdleState } from '../types/idle-timer.types';

interface IdleTimerManagerProps {
  onStateChange: (state: IdleState, timeRemaining: number) => void;
  onControlFunctionsReady: (reset: () => void, pause: () => void, resume: () => void) => void;
}

const IdleTimerManager: React.FC<IdleTimerManagerProps> = ({ 
  onStateChange, 
  onControlFunctionsReady 
}) => {
  const location = useLocation();
  const timeout = 15 * 60 * 1000; // 15 minutes
  const warningTime = 5 * 60 * 1000; // 5 minutes before timeout

  const handleOnPresenceChange = useCallback((presence: any) => {
    const remaining = presence.timeRemaining;
    
    if (presence.type === 'active') {
      onStateChange(IdleState.ACTIVE, remaining);
    } else if (presence.type === 'idle') {
      if (remaining <= warningTime && remaining > 0) {
        onStateChange(IdleState.WARNING, remaining);
      }
    }
  }, [onStateChange, warningTime]);

  const handleOnIdle = useCallback(() => {
    onStateChange(IdleState.IDLE, 0);
    
    // Perform logout
    setTimeout(() => {
      // Clear session
      localStorage.removeItem('authToken');
      sessionStorage.clear();
      
      // Redirect to login
      window.location.href = '/login';
    }, 100);
  }, [onStateChange]);

  const idleTimer = useReactIdleTimer({
    onIdle: handleOnIdle,
    onPresenceChange: handleOnPresenceChange,
    timeout,
    throttle: 500,
    events: [
      'mousedown',
      'mousemove',
      'keypress',
      'scroll',
      'touchstart',
      'click'
    ]
  });

  // Provide control functions to context
  useEffect(() => {
    onControlFunctionsReady(
      idleTimer.reset,
      idleTimer.pause,
      idleTimer.resume
    );
  }, [idleTimer.reset, idleTimer.pause, idleTimer.resume, onControlFunctionsReady]);

  // Update time remaining periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = idleTimer.getRemainingTime();
      const isIdle = idleTimer.isIdle();
      
      if (!isIdle) {
        if (remaining <= warningTime && remaining > 0) {
          onStateChange(IdleState.WARNING, remaining);
        } else if (remaining > warningTime) {
          onStateChange(IdleState.ACTIVE, remaining);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [idleTimer, onStateChange, warningTime]);

  return null;
};

export default IdleTimerManager;