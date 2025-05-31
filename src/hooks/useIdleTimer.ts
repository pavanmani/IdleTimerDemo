import { useIdleTimer } from 'react-idle-timer';
import { useCallback, useRef } from 'react';
import type { UseCustomIdleTimerProps } from '../types/idle-timer.types';

export const useCustomIdleTimer = ({
  onPreLogout,
  onLogout,
  timeout = 15 * 60 * 1000, // 15 minutes
  promptTimeout = 5 * 60 * 1000, // 5 minutes before timeout
}: UseCustomIdleTimerProps) => {
  const preLogoutTriggered = useRef<boolean>(false);

  const handleOnPresenceChange = useCallback((presence: any) => {
    if (presence.type === 'idle' && presence.timeRemaining <= promptTimeout && !preLogoutTriggered.current) {
      preLogoutTriggered.current = true;
      onPreLogout?.();
    }
    
    if (presence.type === 'active') {
      preLogoutTriggered.current = false;
    }
  }, [onPreLogout, promptTimeout]);

  const handleOnIdle = useCallback(() => {
    onLogout?.();
  }, [onLogout]);

  const idleTimer = useIdleTimer({
    onIdle: handleOnIdle,
    onPresenceChange: handleOnPresenceChange,
    timeout,
    throttle: 500,
    events: [
      'mousedown',
      'mousemove',
      'keypress',
      'scroll',
      'touchstart'
    ]
  });

  return {
    ...idleTimer,
    timeRemaining: idleTimer.getRemainingTime(),
    isIdle: idleTimer.isIdle(),
    reset: idleTimer.reset,
    pause: idleTimer.pause,
    resume: idleTimer.resume
  };
};