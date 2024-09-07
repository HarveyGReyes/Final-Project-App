// const [authStatus, setAuthStatus] = useState(false);
// const [isLoading, setIsLoading] = useState(true);

// const checkAuth = async () => {
//   console.log("Starting authentication check...");
//   try {
//     const result = await verifyAuthToken(); 
//     setAuthStatus(result);
//   } catch (error) {
//     console.error('Error during authentication check:', error);
//     setAuthStatus(false);
//   } finally {
//     console.log("Authentication check complete.");
//     setIsLoading(false);
//   }
// };

import { useState, useEffect } from 'react';
import { isUserLoggedIn, getAuthToken, setAuthToken, clearAuthToken, verifyAuthToken } from 'utils/UserAuthentication';

const useAuth = () => {
    const [authStatus, setAuthStatus] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const checkAuth = async () => {
        console.log("Starting authentication check...");
        try {
          const result = await verifyAuthToken();
          setAuthStatus(result);
        } catch (error) {
          console.error('Error during authentication check:', error);
          setAuthStatus(false);
        } finally {
          console.log("Authentication check complete.");
          setIsLoading(false);
        }
      };
  
      console.log("useEffect triggered - starting checkAuth");
      checkAuth();
    }, []);
  
    return { authStatus, isLoading };
  };
  
export default useAuth;

