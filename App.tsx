import React, { useState, useEffect } from 'react';
import { AuthScreen } from './components/AuthScreen.tsx';
import { Dashboard } from './components/Dashboard.tsx';
import { UserRole } from './types.ts';
import { MOCK_GRID_STATUS } from './services/mockData.ts';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('PARTNER');

  useEffect(() => {
    console.log("App Component Mounted");
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full bg-obsidian overflow-hidden">
      {!isAuthenticated ? (
        <AuthScreen onLogin={(role) => {
          setUserRole(role);
          setIsAuthenticated(true);
        }} gridStatus={MOCK_GRID_STATUS} />
      ) : (
        <Dashboard userRole={userRole} onLogout={() => setIsAuthenticated(false)} />
      )}
    </div>
  );
};

export default App;