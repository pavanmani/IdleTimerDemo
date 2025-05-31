import React, { useCallback, useState } from 'react';
import { useCustomIdleTimer } from '../hooks/useIdleTimer';
import { useIdleTimerContext } from '../context/UseIdleTimerContext';
import LogoutWarningModal from './LogoutWarningModal';

const IdleTimerManager: React.FC = () => {
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const { getActiveComponentCallbacks } = useIdleTimerContext();

  const handlePreLogout = useCallback(async (): Promise<void> => {
    const callbacks = getActiveComponentCallbacks();

    // Execute component-specific pre-logout activities
    if (callbacks?.onPreLogout) {
      try {
        await callbacks.onPreLogout();
      } catch (error) {
        console.error('Pre-logout activity failed:', error);
      }
    }

    // Show warning modal
    setShowWarning(true);
  }, [getActiveComponentCallbacks]);

  const handleLogout = useCallback(async (): Promise<void> => {
    const callbacks = getActiveComponentCallbacks();

    // Execute component-specific logout activities (save data)
    if (callbacks?.onLogout) {
      try {
        await callbacks.onLogout();
      } catch (error) {
        console.error('Component logout activity failed:', error);
      }
    }

    // Perform global logout activities
    try {
      // Save any remaining global data
      //   await saveGlobalUserData();
      console.log('Global logout activities executed');

      // Clear session
      //   clearUserSession();
      console.log('User session cleared');

      // Redirect to login
      window.location.href = '/login';
    } catch (error) {
      console.error('Global logout failed:', error);
      // Force logout even if save fails
      //   clearUserSession();
      console.log('User session cleared');
      window.location.href = '/login';
    }
  }, [getActiveComponentCallbacks]);

  const { timeRemaining, reset } = useCustomIdleTimer({
    onPreLogout: handlePreLogout,
    onLogout: handleLogout,
    timeout: 15 * 60 * 1000, // 15 minutes
    promptTimeout: 5 * 60 * 1000 // 5 minutes
  });

  const handleContinueSession = (): void => {
    setShowWarning(false);
    reset();
  };

  const handleLogoutNow = (): void => {
    setShowWarning(false);
    handleLogout();
  };

  return (
    <>
      {showWarning && (
        <LogoutWarningModal
          timeRemaining={timeRemaining}
          onContinue={handleContinueSession}
          onLogout={handleLogoutNow}
        />
      )}
    </>
  );
};

export default IdleTimerManager;
