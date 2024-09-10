import React, { useState , useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';

// import { isUserLoggedIn, getAuthToken, setAuthToken, clearAuthToken } from 'utils/UserAuthentication';
// import useAuth from 'utils/useAuthCheck';

import { useAuth } from 'utils/AuthProvider';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const [userIsAuthenticated, setIsAuthenticated] = useState(false)

  const { handleLogin, currentUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // This prevents the default form submission behavior

    try {
        await handleLogin(username, password);  // Call the login function from context
        console.log("Login successful!");
        authenticateUser(true);
    } catch (error) {
        console.error("Login failed:", error);
        authenticateUser(false);
    }
  };
  
  const authenticateUser = (isAuthenticated : boolean) => {
    setIsAuthenticated(isAuthenticated);
  }
  
  useEffect(() => {
      // console.log('currentUser updated:', currentUser);
      if (currentUser){
        navigate('/class-selection')
      }
  }, [currentUser]);

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