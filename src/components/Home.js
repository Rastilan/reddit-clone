import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { firestore, auth } from './Firebase';
import '../styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';
import { faThumbsUp as faThumbsUpSolid, faThumbsDown as faThumbsDownSolid } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch posts from Firebase Firestore
    const fetchPosts = async () => {
      try {
        const postsRef = firestore.collection('posts');
        const snapshot = await postsRef.get();

        const postData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPosts(postData);
      } catch (error) {
        console.log('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleThumbsUp = async (postId) => {
    try {
      const postRef = firestore.collection('posts').doc(postId);
      const postSnapshot = await postRef.get();

      if (postSnapshot.exists) {
        const currentLikes = postSnapshot.data().likes || 0;
        await postRef.update({ likes: currentLikes + 1 });
        console.log('Thumbs-up updated successfully!');
        
        setPosts((prevPosts) =>
          prevPosts.map((post) => {
            if (post.id === postId) {
              return { ...post, liked: true, disliked: false };
            } else {
              return post;
            }
          })
        );
      }
    } catch (error) {
      console.log('Error updating thumbs-up:', error);
    }
  };

  const handleThumbsDown = async (postId) => {
    try {
      const postRef = firestore.collection('posts').doc(postId);
      const postSnapshot = await postRef.get();

      if (postSnapshot.exists) {
        const currentDislikes = postSnapshot.data().dislikes || 0;
        await postRef.update({ dislikes: currentDislikes + 1 });
        console.log('Thumbs-down updated successfully!');
        
        setPosts((prevPosts) =>
          prevPosts.map((post) => {
            if (post.id === postId) {
              return { ...post, liked: false, disliked: true };
            } else {
              return post;
            }
          })
        );
      }
    } catch (error) {
      console.log('Error updating thumbs-down:', error);
    }
  };

  let GetVotes = (likes, dislikes) => {
    if (likes > 0 || dislikes > 0) {
      return likes - dislikes;
    } else {
      return "vote";
    }
  };

  const handleLogout = () => {
    auth.signOut().then(() => {
      // Redirect or perform additional actions upon successful logout
      navigate('/');
    }).catch((error) => {
      console.log('Error logging out:', error);
    });
  };

  return (
    <div className="container">
      <nav className="navbar">
        <div className="navbar-left">
          <ul>
            <li>Reddit-Clone</li>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-right">
          <ul>
            {auth.currentUser ? (
              <li className="user-info">
                {auth.currentUser.email}
                <button onClick={handleLogout}>Logout</button>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      {/* <div className="banner"></div> -- for adding when in dedicated subreddits */}

      <div className="page-content">
        <div className="left-side">
        <div className="create-post">

            <Link to="/create-post" className="create-post-link">
              <input className="create-post-box" type="text" placeholder="Create Post" />
            </Link>
        </div>

          <div className="sort-options">
            <ul>
              <li>Newest</li>
              <li>Top Rated</li>
            </ul>
          </div>

          <div className="post-list">
            {posts.map((post) => (
              <div className="post-item" key={post.id}>
                <div className="post-left-side">
                  <FontAwesomeIcon
                    icon={post.liked ? faThumbsUpSolid : faThumbsUp}
                    onClick={() => handleThumbsUp(post.id)}
                  />
                  <div>{GetVotes(post.likes, post.dislikes)}</div>
                  <FontAwesomeIcon
                    icon={post.disliked ? faThumbsDownSolid : faThumbsDown}
                    onClick={() => handleThumbsDown(post.id)}
                  />
                </div>
                <div className="post-right-side">
                  <h3>
                    <Link to={`/posts/${post.id}`}>{post.title}</Link>
                  </h3>
                  <p>{post.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="right-side">
          <div className="right-side-box">
            <div>Reddit-Clone Premium</div>
            <div>The worst Reddit-Clone experience, with no benefits</div>
            <button>Don't Try Now</button>
          </div>
          <div className="right-side-box">
            <div>Home</div>
            <div>Your non-personal Reddit-Clone frontpage.</div>
            <button>Create Post</button>
          </div>

          <div className="right-side-box">
            more garbage text/info. There's really no reason to add a fake user agreement and the like, just enjoy
            this text.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;