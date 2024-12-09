import React from 'react'
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicRouter from './pages/Public/PublicRouter';
import AccountRouter from './pages/Account/AccountRouter';
import AuthGuard from './helpers/AuthGuard';

const App = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<PublicRouter />} />
        <Route path="/account/*" element={
          <AuthGuard>
            <AccountRouter />
          </AuthGuard>
        } />
      </Routes>
    </BrowserRouter>
  </div>
);

function render() {
  const root = ReactDOM.createRoot(document.getElementById("app"));
  root.render(<App/>);
}

render();
