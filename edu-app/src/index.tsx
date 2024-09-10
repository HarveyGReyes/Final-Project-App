import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/pages/index.scss';
import App from './App';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import AuthProvider from 'utils/AuthProvider';
import NavBar from 'components/NavBar';

import router from 'utils/Router';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  // <App />
  <AuthProvider>
    <App/>
  </AuthProvider>
);