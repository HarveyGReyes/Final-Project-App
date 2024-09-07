import { Outlet, Navigate } from 'react-router-dom'
import React, { useState } from 'react';



const PrivateRoutes = ({ isAuthenticated }:any) => {
    if (!isAuthenticated) {
      // Redirect to login page if not authenticated
      return <Navigate to="/login" />;
    }
    // Render the child routes if authenticated
    return <Outlet />;
  };

export default PrivateRoutes