// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import PostDetails from './components/PostDetails';
import CreatePost from './components/CreatePost';
import Login from './components/Login';
import Signup from './components/Signup';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reddit-clone" element={<Home />} />
        <Route path="/posts/:postId" element={<PostDetails />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;