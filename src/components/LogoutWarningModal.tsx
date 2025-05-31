import React, { useEffect, useState } from 'react';
import type { LogoutWarningModalProps } from '../types/idle-timer.types';

const LogoutWarningModal: React.FC<LogoutWarningModalProps> = ({ 
  timeRemaining, 
  onContinue, 
  onLogout 
}) => {
  const [countdown, setCountdown] = useState<number>(Math.floor(timeRemaining / 1000));

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          onLogout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onLogout]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

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
            onClick={onLogout}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Logout Now
          </button>
          <button
            onClick={onContinue}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Continue Session
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutWarningModal;