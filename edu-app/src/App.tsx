import React, { useState, useEffect  } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';

import LoginPage from './webpages/LoginPage'
import Dashboard from './webpages/Dashboard'
import PrivateRoutes from './utils/PrivateRoutes';
import { isUserLoggedIn, getAuthToken, setAuthToken, clearAuthToken, verifyAuthToken } from 'utils/UserAuthentication';
import useAuth from 'utils/useAuthCheck';

function App() {
  // const { authStatus, isLoading } = useAuth();
  // console.log("authStatus", authStatus)

  const { authStatus, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading indicator while auth status is being fetched
  }
  if (authStatus === null) return null;

  return (
    <div>
      <Router>
        <Routes>
          <Route element={<PrivateRoutes isAuthenticated={authStatus}/>}>
            <Route path="/home" element={ <Dashboard/> }/>
          </Route>

          {/* <Route path="/home" element={<Dashboard/>}/> */}


          <Route path="/login" element={<LoginPage/>}/>
          <Route path="*" element={<Navigate to="/login" />} />

          {/* <Route path="*" element={<Navigate to={authStatus ? "/home" : "/login"} />} /> */}


          {/* <Route 
            path="/" 
            element={<Navigate to={authStatus ? "/home" : "/login"} />} 
          />  */}
                
          {/* <Route 
            path="/home" 
            element={userIsAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
          /> */}

          


          
          {/* Catch-all route for 404 pages
          <Route 
            path="*" 
            element={<NotFound />} 
          /> */}
        </Routes>
      </Router>
    </div>
    

  )
}

export default App