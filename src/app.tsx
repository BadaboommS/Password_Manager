import React from 'react'
import * as ReactDOM from 'react-dom/client';
import Dashboard from './components/Dashboard';

const App = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <Dashboard></Dashboard>
  </div>
);

function render() {
  const root = ReactDOM.createRoot(document.getElementById("app"));
  root.render(<App/>);
}

render();
