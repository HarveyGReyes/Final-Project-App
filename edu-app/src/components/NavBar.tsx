import React from 'react';
import '../assets/styles/components/NavBar.scss';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'utils/AuthProvider';

import LogOutButton from './LogOutButton';

const NavBar = () => {
    // const navigate = useNavigate()

    const { handleLogout } = useAuth();

    const logOut = async () => {
        await handleLogout
    }

  // console.log('classData', typeof(classData), classData)
  return (
    <div className='nav-bar-container'>
        <LogOutButton/>
    </div>
    
  );
};

export default NavBar;


