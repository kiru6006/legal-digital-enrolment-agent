import React from 'react';
import { HashRouter } from 'react-router-dom';
import { ApplicationStoreProvider } from '../store/applicationStore';
import { AppRoutes } from './routes';

export const App: React.FC = () => {
  return (
    <HashRouter>
      <ApplicationStoreProvider>
        <AppRoutes />
      </ApplicationStoreProvider>
    </HashRouter>
  );
};

export default App;
