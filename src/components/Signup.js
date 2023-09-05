import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, storage, firestore } from './Firebase';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [avatarImage, setAvatarImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarImage(e.target.files[0]);
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const creationTimestamp = new Date().toISOString();
    
    auth.createUserWithEmailAndPassword(email, password)
      .then(async (userCredential) => {
        // User is signed up
        const user = userCredential.user;

        // Upload image if selected
      let photoURL = null;
      if (avatarImage) {
        const storageRef = storage.ref();
        const imageRef = storageRef.child(`profile-images/${user.uid}`);
        await imageRef.put(avatarImage);
        photoURL = await imageRef.getDownloadURL();
      }

        user.updateProfile({
          displayName: username,
          photoURL: photoURL,
        });

        // Save karma in Firestore
          const userRef = firestore.collection('users').doc(user.uid);
          await userRef.set({
            karma: 0, // Initialize karma to 0
            joined: creationTimestamp,
            lastonline: creationTimestamp,
          });

        navigate('/');
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
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Profile Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
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
