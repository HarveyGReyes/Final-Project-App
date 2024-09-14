import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import PrivateRoute from './PrivateRoutes';

import LoginPage from '../webpages/LoginPage'
import Dashboard from '../webpages/Dashboard'
import ClassSelectionPage from '../webpages/ClassSelection';
import InsightsPage from '../webpages/InsightsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/class-selection',
    element: <PrivateRoute element={ClassSelectionPage} />
  },
  {
    path: '/home',
    element: <PrivateRoute element={Dashboard} />
  },
  {
    path: '/insights',
    element: <PrivateRoute element={InsightsPage} />
  }
]);

export default router;
