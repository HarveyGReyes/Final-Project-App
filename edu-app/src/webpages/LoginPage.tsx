import React, { useState , useEffect} from 'react';
import { BrowserRouter as Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import { useAuth } from 'utils/AuthProvider';

import '../assets/styles/pages/LoginPage.scss'


export default function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { handleLogin, currentUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // This prevents the default form submission behavior

    try {
        const response = await handleLogin(username, password);  // Call the login function from context
        console.log("Login successful:", response);
        setSuccess('Login Sucessful!')
    } catch (error) {
        console.error("Login failed:", error);
        setError(`Login failed. ${error}`)
    }
  };
  
  useEffect(() => {
      // console.log('currentUser updated:', currentUser);
      if (currentUser){
        navigate('/class-selection')
      }
  }, [currentUser]);

  return (
    <div className="login-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}      // Starting state
        animate={{ opacity: 1, y: 0 }}       // Animation to final state
        exit={{ opacity: 0, y: 20 }}         // Exit state
        transition={{ duration: 0.5 }}       // Duration of the animation
      >
        <div className='login-form-container'>
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
      </motion.div>
    </div>
  );
}