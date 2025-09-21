import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { AppProvider } from './AppProvider';
import 'src/css/index.css';
import 'tippy.js/dist/tippy.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import 'yet-another-react-lightbox/plugins/counter.css';

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
);
