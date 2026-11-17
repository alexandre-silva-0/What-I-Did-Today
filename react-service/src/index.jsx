import React from 'react';
import ReactDOM from 'react-dom/client';

// Fonte e ícones instalados pelo npm: vão no build, sem depender de CDN
import '@fontsource-variable/inter';
import 'bootstrap-icons/font/bootstrap-icons.css';

import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Service worker só no build de produção; no `npm run dev` ele atrapalharia o hot reload
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((error) => {
      console.error('Não foi possível registrar o service worker:', error);
    });
  });
}
