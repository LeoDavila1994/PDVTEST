import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './scss/index.css';
import { axiosInterceptor } from './utilities/apiClient.tsx';
import { Provider } from 'react-redux';
import { store } from './store/index.tsx';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './utilities/queryClient.tsx';

axiosInterceptor();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
