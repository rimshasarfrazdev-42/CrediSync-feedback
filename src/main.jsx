import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeChooserProvider } from './contexts/theme-chooser';

// Create a client
export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeChooserProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeChooserProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
