import React, { useState, useEffect  } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';

import LoginPage from './webpages/LoginPage'
import Dashboard from './webpages/Dashboard'
import NavBar from 'components/NavBar';

import { useAuth } from 'utils/AuthProvider';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import router from 'utils/Router';

import AuthProvider from 'utils/AuthProvider';

import { motion } from 'framer-motion';

import './assets/styles/pages/App.scss'

function App() {
  const { handleLogin, currentUser } = useAuth();

  return (
    <main>
      <motion.div
        initial={{ opacity: 0, y: 20 }}      // Starting state
        animate={{ opacity: 1, y: 0 }}       // Animation to final state
        exit={{ opacity: 0, y: 20 }}         // Exit state
        transition={{ duration: 0.5 }}       // Duration of the animation
      >
        {currentUser ? <NavBar /> : null}
        <RouterProvider router={router} />
      </motion.div>
      
    </main>
  )
}

export default App