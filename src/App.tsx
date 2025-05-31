import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { IdleTimerProvider } from './context/IdleTimerContext';
import IdleWarningModal from './components/IdleWarningModal';
import DashboardPage from './components/DashboardPage';
import ProfilePage from './components/ProfilePage';

const App: React.FC = () => {
  return (
    <Router>
      <IdleTimerProvider>
        <div className="App min-h-screen bg-gray-50">
          {/* Global idle warning modal */}
          <IdleWarningModal />
          
          {/* Navigation */}
          <nav className="bg-white shadow-sm border-b p-4">
            <div className="flex space-x-4">
              <a href="/dashboard" className="text-blue-600 hover:text-blue-800">Dashboard</a>
              <a href="/profile" className="text-blue-600 hover:text-blue-800">Profile</a>
            </div>
          </nav>

          {/* Routes */}
          <Routes>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </IdleTimerProvider>
    </Router>
  );
};

export default App;