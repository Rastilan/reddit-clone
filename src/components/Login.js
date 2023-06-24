// Login.js

import React, { useState } from 'react';
import { auth } from './Firebase';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // User is signed in
        const user = userCredential.user;
        console.log('User logged in:', user);
        // Redirect or perform additional actions upon successful login
        navigate('/');
      })
      .catch((error) => {
        // Handle login errors
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Login error:', errorCode, errorMessage);
        setError(errorMessage);
      });
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};


export default Login;