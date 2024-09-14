import React, {useEffect, useState} from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider'; // Adjust the path to where useAuth is located

const PrivateRoute = ({ element: Element }: { element: React.ComponentType }) => {
  const { authToken, currentUser } = useAuth(); // Use the hook to access authToken and currentUser
//   console.log(authToken, currentUser)

  const [isLoading, setIsLoading] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);

//   if (!authToken || !currentUser) {
//     // If not authenticated, redirect to the login page
//     return <Navigate to="/login" replace />;
//   }
    useEffect(() => {
        // Simulate a delay before checking authentication
        console.log('Checking if authToken or User exists')
        console.log(authToken, currentUser)
        console.log(!authToken, !currentUser)
        const timer = setTimeout(() => {
        if (!authToken || !currentUser) {
            // If not authenticated, set the redirect state to true
            setShouldRedirect(true);
        }
        setIsLoading(false); // Once the check is done, set loading to false
        }, 200); // Delay of 2000 milliseconds (2 seconds)

        return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }, [authToken, currentUser]);

    if (isLoading) {
        // Show a loading spinner or placeholder while checking
        // return <div>Loading...</div>;
    }

    if (shouldRedirect) {
        console.log('redirecting')
        return <Navigate to="/login" replace />;
    }

    // If authenticated, render the desired component
    return <Element />;
    };

export default PrivateRoute;