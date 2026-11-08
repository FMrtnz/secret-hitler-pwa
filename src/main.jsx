import React from 'react';
import { createRoot } from 'react-dom/client';
// Self-hosted fonts (bundled and precached by the PWA, so they work offline).
import '@fontsource/stardos-stencil/400.css';
import '@fontsource/stardos-stencil/700.css';
import '@fontsource/courier-prime/400.css';
import '@fontsource/courier-prime/700.css';
import App from './view/App.jsx';
import './view/styles.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
