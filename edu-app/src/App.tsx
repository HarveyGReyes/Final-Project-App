import React, { useState, useEffect  } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';

import LoginPage from './webpages/LoginPage'
import Dashboard from './webpages/Dashboard'
import NavBar from 'components/NavBar';

import { useAuth } from 'utils/AuthProvider';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import router from 'utils/Router';

import AuthProvider from 'utils/AuthProvider';


function App() {
  const { handleLogin, currentUser } = useAuth();

  return (
    <main>
      <NavBar />
      <RouterProvider router={router} />
    </main>
  )
}

export default App