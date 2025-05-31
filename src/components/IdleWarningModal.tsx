import React, { useEffect, useState } from 'react';
import { useIdleTimer } from '../context/IdleTimerContext';
import { IdleState } from '../types/idle-timer.types';

const IdleWarningModal: React.FC = () => {
  const { idleState, timeRemaining, reset } = useIdleTimer();
  const [countdown, setCountdown] = useState<number>(0);

  useEffect(() => {
    if (idleState === IdleState.WARNING) {
      setCountdown(Math.floor(timeRemaining / 1000));
    }
  }, [idleState, timeRemaining]);

  useEffect(() => {
    if (idleState === IdleState.WARNING && countdown > 0) {
      const interval = setInterval(() => {
        setCountdown(prev => Math.max(0, prev - 1));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [idleState, countdown]);

  const handleContinueSession = () => {
    reset();
  };

  const handleLogoutNow = () => {
    // Clear session and redirect
    localStorage.removeItem('authToken');
    sessionStorage.clear();
    window.location.href = '/login';
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (idleState !== IdleState.WARNING) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Session Timeout Warning
        </h2>
        <p className="mb-4 text-gray-600">
          Your session will expire in <strong>{formatTime(countdown)}</strong>.
          Would you like to continue your session?
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={handleLogoutNow}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Logout Now
          </button>
          <button
            onClick={handleContinueSession}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Continue Session
          </button>
        </div>
      </div>
    </div>
  );
};

export default IdleWarningModal;
