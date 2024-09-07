// import React, { ReactNode, useEffect, useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const COOKIE_NAME = 'authToken';

export const isUserLoggedIn = (): boolean => {
  // Check if the cookie exists
  const authToken = Cookies.get(COOKIE_NAME);


  return !!authToken; // Return true if cookie exists, false otherwise
};

// export const verifyAuthToken = async (): Promise<boolean> => {
//   const response = axios.get('http://localhost:3001/api/verify-user', {
//     headers: {
//         'Cookie': 'token= ${getAuthToken()}'
//     },
//     withCredentials: true, // This ensures cookies are sent and received
//   }).then((response)=> {
//     console.log("Auth Token Verified - User is authenticated")
//     console.log("Response", response)
//   // localStorage.setItem('authToken', response.data.token);        
//   })
//   .catch(error => {
//   // console.error('Error fetching data:', error);
//     console.error('Error: ', error.response.data.message)
//     console.log("Returning False")
//     return false
//   });
//   console.log("Returning True")
//   return true
// }

export const verifyAuthToken = async (): Promise<boolean> => {
  try {
    // Await the axios request to handle promise correctly
    const response = await axios.get('http://localhost:3001/api/verify_user', {
      headers: {
        'Cookie': `token=${getAuthToken()}`, // Use template literals correctly
      },
      withCredentials: true, // Ensure cookies are sent and received
    });

    console.log("Auth Token Verified - User is authenticated");
    console.log("Response", response);

    // Optionally store token or other information
    // localStorage.setItem('authToken', response.data.token);

    return true;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle AxiosError specifically
      console.error('Error: ', error.response?.data?.message || error.message);
    } else {
      // Handle unexpected errors
      console.error('Unexpected error: ', error);
    }
    return false;
  }
};

export const getAuthToken = (): string | undefined => {
  try{
      return Cookies.get(COOKIE_NAME);
  } catch (err) {
      console.error("Error fetching authToken cookie", err)
  }
  return;    
};

export const setAuthToken = (token: string): void => {
  Cookies.set(COOKIE_NAME, token, { expires: 7 }); // Cookie expires in 7 days
};

export const clearAuthToken = (): void => {
  Cookies.remove(COOKIE_NAME);
};