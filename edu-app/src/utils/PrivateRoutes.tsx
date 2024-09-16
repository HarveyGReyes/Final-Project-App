import React, {useEffect, useState} from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const PrivateRoute = ({ element: Element }: { element: React.ComponentType }) => {
  const { authToken, currentUser } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
        if (!authToken || !currentUser) {

            setShouldRedirect(true);
        }
        setIsLoading(false);
        }, 200);

        return () => clearTimeout(timer); 
    }, [authToken, currentUser]);

    if (isLoading) {
        // Show a loading spinner or placeholder while checking
        // return <div>Loading...</div>;
    }

    if (shouldRedirect) {
        return <Navigate to="/login" replace />;
    }

    // If authenticated, render the desired component
    return <Element />;
    };

export default PrivateRoute;