import React from 'react';
import '../assets/styles/components/NavBar.scss';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'utils/AuthProvider';

function LogOutButton() {
    // const navigate = useNavigate()

    const { handleLogout } = useAuth();

    const logOut = async () => {
        await handleLogout
    }

  // console.log('classData', typeof(classData), classData)
  return (
    <button className="log-out" onClick={logOut}>
        Log out
    </button>

    
  );
};

export default LogOutButton;


