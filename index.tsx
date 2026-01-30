import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

const mountApp = () => {
  console.log("Ambient Twin NOC: Initializing Core...");
  
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error("NOC Boot Failure: Root element missing.");
    return;
  }

  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("Ambient Twin NOC: System mounted successfully.");
  } catch (err) {
    console.error("NOC Mount Failure:", err);
    rootElement.innerHTML = `<div style="color:red; padding: 20px;">Mount Failure: ${err}</div>`;
  }
};

// Immediate mount to bypass state race conditions
mountApp();