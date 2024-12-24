import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // or './index.scss' depending on your styling
import App from './App'; // This should import your App component// Optional: For reporting web vitals

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
