import React, { useState } from 'react';
import { firestore } from './Firebase.js'; // Assuming you have a 'firebase.js' file exporting the Firestore instance

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create a new post document in the 'posts' collection
      await firestore.collection('posts').add({
        title,
        body,
      });

      console.log('Post created successfully!');
      // Clear form fields
      setTitle('');
      setBody('');
    } catch (error) {
      console.log('Error creating post:', error);
    }
  };

  return (
    <div>
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={handleTitleChange} />
        </div>
        <div>
          <label>Body:</label>
          <textarea value={body} onChange={handleBodyChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreatePost;