import React, { useState , useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { response } from 'express';
import Cookies from 'js-cookie';

import { isUserLoggedIn, getAuthToken, setAuthToken, clearAuthToken } from 'utils/UserAuthentication';
import useAuth from 'utils/useAuthCheck';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const [userIsAuthenticated, setIsAuthenticated] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // This prevents the default form submission behavior
  
    try {
      const response = await axios.post('http://localhost:3001/api/login', {
        username: username,
        password: password
      },
      {
        withCredentials: true, // This ensures cookies are sent and received
      });
  
      console.log('Response:', response);
      // Optionally store token or other information
      // localStorage.setItem('authToken', response.data.token);
  
      // Handle successful authentication
      authenticateUser(true);
      setError(null);
      setSuccess(response.data.message);

    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle AxiosError specifically
        console.error('Error: ', error.response?.data?.error || error.message);
        setError(error.response?.data?.error || 'An unexpected error occurred');
      } else {
        // Handle unexpected errors
        console.error('Unexpected error: ', error);
      }
  
      // Handle failed authentication
      setSuccess(null);
      authenticateUser(false);
    }
  };
  
  const authenticateUser = (isAuthenticated : boolean) => {
    setIsAuthenticated(isAuthenticated);
  }

  useEffect(() => {
    if (userIsAuthenticated) {
        navigate('/home');
        console.log('User is now authenticated');
    }
  }, [userIsAuthenticated, navigate]);

  useEffect(() => {

    console.log('Check', userIsAuthenticated)
    if (userIsAuthenticated) {
      navigate('/home')
      console.log('Redirect to home')
    }
  }, [navigate]);


  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <p>Username:</p>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <p>Password:</p>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Log In</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}
    </div>
  );
}