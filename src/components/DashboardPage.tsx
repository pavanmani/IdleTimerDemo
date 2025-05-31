import React, { useState } from 'react';
import { useIdleActions } from '../hooks/useIdleActions';

const DashboardPage: React.FC = () => {
  const [showWarning, setShowWarning] = useState(false);

  const { idleState, isWarning, isIdle } = useIdleActions({
    onWarning: async () => {
      console.log('Dashboard: 5 minutes warning triggered');
      // Save draft data
      await saveDashboardDrafts();
      // Show custom warning for dashboard
      setShowWarning(true);
    },
    onIdle: async () => {
      console.log('Dashboard: Idle logout triggered');
      // Save dashboard specific data before logout
      await saveDashboardData();
    }
  });

  const saveDashboardDrafts = async (): Promise<void> => {
    // Save any unsaved dashboard data
    console.log('Saving dashboard drafts...');
    // API call to save drafts
  };

  const saveDashboardData = async (): Promise<void> => {
    // Save dashboard specific data
    console.log('Saving dashboard data before logout...');
    // API call to save data
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      
      {/* Idle state indicator */}
      <div className="mb-4 p-2 rounded bg-gray-100">
        <span className="font-semibold">Idle State: </span>
        <span className={`px-2 py-1 rounded text-sm ${
          isWarning ? 'bg-yellow-200 text-yellow-800' : 
          isIdle ? 'bg-red-200 text-red-800' : 
          'bg-green-200 text-green-800'
        }`}>
          {idleState}
        </span>
      </div>

      {/* Dashboard custom warning */}
      {showWarning && (
        <div className="mb-4 p-4 bg-yellow-100 border border-yellow-400 rounded">
          <p className="text-yellow-800">
            Dashboard Warning: Your unsaved changes will be lost if you don't continue your session!
          </p>
          <button 
            onClick={() => setShowWarning(false)}
            className="mt-2 px-3 py-1 bg-yellow-500 text-white rounded text-sm"
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-blue-100 rounded">
          <h3 className="font-semibold">Widget 1</h3>
          <p>Dashboard content...</p>
        </div>
        <div className="p-4 bg-green-100 rounded">
          <h3 className="font-semibold">Widget 2</h3>
          <p>More dashboard content...</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
