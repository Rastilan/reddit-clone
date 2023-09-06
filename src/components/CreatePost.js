import React, { useState } from 'react';
import { firestore, auth } from './Firebase.js'; // Assuming you have a 'firebase.js' file exporting the Firestore instance
import Nav from '../components/Nav.js';
import '../css/CreatePost.css';


const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [postType, setPostType] = useState('');
  const [flair, setFlair] = useState('');
  const currentUser = auth.currentUser;



  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleFormatChange = (format) => {
    // Create a copy of the current body content
    let newBody = body;

    switch (format) {
      case 'bold':
        newBody = `<strong>${newBody}</strong>`;
        break;
      case 'italic':
        newBody = `<em>${newBody}</em>`;
        break;
      case 'link':
        // Replace the selected text with a link
        const selectedText = window.getSelection().toString();
        if (selectedText) {
          const url = prompt('Enter the URL:');
          if (url) {
            newBody = newBody.replace(selectedText, `<a href="${url}" target="_blank">${selectedText}</a>`);
          }
        }
        break;
      case 'strikethrough':
        newBody = `<del>${newBody}</del>`;
        break;
      default:
        break;
    }

    // Update the body state with the formatted content
    setBody(newBody);
  };





  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create a new post document in the 'posts' collection
      await firestore.collection('posts').add({
        title,
        body,
        'likes' : 0,
        'dislikes' : 0,
        'community' : '',
        'comments' : 0,
        'img' : '',
        'poster': currentUser,
        'postType': postType,
        'flair': flair,



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
    <>
    <Nav />
      <div className="create-post-container">
        <h1>Create a Post</h1>
        <div className="post-options">
          <button>Post</button>
          <button>Images</button>
          <button>Link</button>
          <button>Poll</button>
        </div>
        <div className="post-title">
          <label>Title:</label>
          <input type="text" value={title} onChange={handleTitleChange} maxLength={300} />
        </div>
        <div className="post-body">
          <label>Body:</label>
          <textarea value={body} onChange={handleBodyChange} />
        </div>
        <div className="post-controls">
          {/* Add controls for bold, italicize, link, strikethrough */}
          <button onClick={() => handleFormatChange('bold')}>Bold</button>
          <button onClick={() => handleFormatChange('italic')}>Italic</button>
          <button onClick={() => handleFormatChange('link')}>Link</button>
          <button onClick={() => handleFormatChange('strikethrough')}>Strikethrough</button>
        </div>
        <div className="post-flairs">
          {/* Add flairs here */}
          <label>Flair:</label>
          <select value={flair} onChange={(e) => setFlair(e.target.value)}>
            <option value="">Select a flair</option>
            <option value="Flair 1">Flair 1</option>
            <option value="Flair 2">Flair 2</option>
            {/* Add more flair options as needed */}
          </select>
        </div>
        <button type="submit" onClick={handleSubmit}>
          Post
        </button>
      </div>
      </>
  );
};

export default CreatePost;