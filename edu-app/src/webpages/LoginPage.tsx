import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';

interface LoginPageProps {
  // isAuthenticated: boolean;
  // setIsAuthenticated: boolean;
  // isAuthenticated: (data: boolean) => void;

  // isAuthenticated: boolean; // This should be a boolean
  setIsAuthenticated: (data: boolean) => void; // Function to update authentication state#
  // setIsAuthenticated:  React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LoginPage({ setIsAuthenticated }: LoginPageProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [responseData, setResponseData] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e: any) => {
      e.preventDefault(); // This prevents the default form submission behavior

      try {
        const response = axios.post('http://localhost:3001/api/login', {
            username: username,
            password: password
          }).then((response)=> {
            console.log('response', response)
            console.log('User is now authenticated')

            setError(null);
            setSuccess(response.data.message);
            setIsAuthenticated(true);
          })
          .catch(error => {
            // console.error('Error fetching data:', error);
            console.error('Error: ', error.response.data.error)

            setError(error.response.data.error);
            setSuccess(null);
            setIsAuthenticated(false);
          });
      } catch (err) {
          console.error('Login failed', err);
          setIsAuthenticated(false);
      }
    }

    // if (isAuthenticated) {

    // }

    // if (isAuthenticated) {
    //   return <Navigate to="./webpages/Dashboard" />;
    // }

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