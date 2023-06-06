import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { firestore } from './Firebase';
import '../styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { faThumbsUpSolid, faThumbsDownSolid  } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp, faThumbsDown  } from '@fortawesome/free-regular-svg-icons';


const Home = () => {
  const [posts, setPosts] = useState([]);

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


  return (
    <div className="container">
      <nav className="navbar">
        <ul>
          <li>Reddit-Clone</li>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>
      <div className="page-content">
          <div className="left-side">

          <div className="create-post">
            <Link to={'/create-post'}> Create Post</Link>
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
                            <FontAwesomeIcon icon={faThumbsUp} />
                            <div>vote</div>
                            <FontAwesomeIcon icon={faThumbsDown} />
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
              more garbage text/info. Theres really no reaon to add a fake user agreement and the like, just enjoy this text.
            </div>
          </div>
      </div>



    </div>
  );
};


export default Home;



