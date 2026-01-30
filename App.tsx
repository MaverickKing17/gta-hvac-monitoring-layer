import React, { useState } from 'react';
import { AuthScreen } from './components/AuthScreen';
import { Dashboard } from './components/Dashboard';
import { UserRole } from './types';
import { MOCK_GRID_STATUS } from './services/mockData';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('PARTNER');

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <>
      {!isAuthenticated ? (
        <AuthScreen onLogin={handleLogin} gridStatus={MOCK_GRID_STATUS} />
      ) : (
        <Dashboard userRole={userRole} onLogout={handleLogout} />
      )}
    </>
  );
};

export default App;