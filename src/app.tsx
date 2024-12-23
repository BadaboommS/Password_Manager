import React from 'react'
import * as ReactDOM from 'react-dom/client';
import { Routes, Route, HashRouter } from 'react-router';
import './style/main.css';
import PublicRouter from './pages/Public/PublicRouter';
import AccountRouter from './pages/Account/AccountRouter';
import AuthGuard from './helpers/AuthGuard';
import GeneralContextProvider from './context/GeneralContextProvider';

const App = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <GeneralContextProvider>
      <HashRouter>
        <Routes>
          <Route path="/*" element={<PublicRouter />} />
          <Route path="/account/*" element={
            <AuthGuard>
              <AccountRouter />
            </AuthGuard>
          } />
        </Routes>
      </HashRouter>
    </GeneralContextProvider>
  </div>
);

function render() {
  const root = ReactDOM.createRoot(document.getElementById("app"));
  root.render(<App/>);
}

render();