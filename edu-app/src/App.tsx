import React, { useState } from 'react';
// import LoginPage from '../frontend/src/pages/LoginPage'
// import Dashboard from '../frontend/src/pages/Dashboard'

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import LoginPage from './webpages/LoginPage'
import Dashboard from './webpages/Dashboard'

function App() {
  const [userIsAuthenticated , setIsAuthenticated] = useState(false);

  const handleAuthentication = (authenticated:boolean) => {
    setIsAuthenticated(authenticated);
  };


  if (userIsAuthenticated){
    console.log("USER IS AUTHENTICATED")
  }

  

  return (
    // <div>
    //   <LoginPage/>
    //   {/* <Dashboard/> */}
    // </div>

    <Router>
      <Routes>
        {/* Route for login page */}
        <Route 
          path="/login" 
          element={<LoginPage setIsAuthenticated={handleAuthentication} />} 
        />
        
        {/* Route for dashboard page */}
        <Route 
          path="/home" 
          element={userIsAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
        />

        {/* Default route or landing page */}
        <Route 
          path="/" 
          element={<Navigate to={userIsAuthenticated ? "/home" : "/login"} />} 
        />
        
        {/* Catch-all route for 404 pages
        <Route 
          path="*" 
          element={<NotFound />} 
        /> */}
      </Routes>
    </Router>

  )
}

export default App