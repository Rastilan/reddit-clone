import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './Firebase';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // User is signed up
        const user = userCredential.user;
        console.log('User signed up:', user);
        // Redirect to home page
        navigate('/home');
      })
      .catch((error) => {
        // Handle signup errors
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Signup error:', errorCode, errorMessage);
        setErrorMessage(errorMessage);
      });
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} required />
        </div>
        {errorMessage && <p>{errorMessage}</p>}
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
