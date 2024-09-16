import React from 'react';
import '../assets/styles/components/NavBar.scss';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'utils/AuthProvider';

import { CiLogout } from "react-icons/ci";

function LogOutButton() {
    // const navigate = useNavigate()

    const { handleLogout, currentUser } = useAuth();

    async function logOut() {
        await handleLogout()
        // console.log('log out button pressed')
    }

    if (currentUser){
      return (
        <button className="log-out-btn" onClick={logOut}>
            <CiLogout size={18} />
        </button>        
      );
    }
    else{
      return null
    }  
};

export default LogOutButton;


