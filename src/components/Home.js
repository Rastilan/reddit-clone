import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { firestore } from './Firebase';
import '../styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';
import { faThumbsUp as faThumbsUpSolid, faThumbsDown as faThumbsDownSolid } from '@fortawesome/free-solid-svg-icons';


import Nav from './Nav';
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
      return "0";
    }
  };



  return (
    <div className="container">
      <Nav />

      <div className="page-content">
        <div className="left-side">
        <div className="create-post">

            <Link to="/create-post" className="create-post-link">
              <input className="create-post-box" type="text" placeholder="Create Post" />

            </Link>
            <Link to="/create-post">
            <svg width="35" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M14.2639 15.9375L12.5958 14.2834C11.7909 13.4851 11.3884 13.086 10.9266 12.9401C10.5204 12.8118 10.0838 12.8165 9.68048 12.9536C9.22188 13.1095 8.82814 13.5172 8.04068 14.3326L4.04409 18.2801M14.2639 15.9375L14.6053 15.599C15.4112 14.7998 15.8141 14.4002 16.2765 14.2543C16.6831 14.126 17.12 14.1311 17.5236 14.2687C17.9824 14.4251 18.3761 14.8339 19.1634 15.6514L20 16.4934M14.2639 15.9375L18.275 19.9565M18.275 19.9565C17.9176 20 17.4543 20 16.8 20H7.2C6.07989 20 5.51984 20 5.09202 19.782C4.71569 19.5903 4.40973 19.2843 4.21799 18.908C4.12796 18.7313 4.07512 18.5321 4.04409 18.2801M18.275 19.9565C18.5293 19.9256 18.7301 19.8727 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V16.4934M4.04409 18.2801C4 17.9221 4 17.4575 4 16.8V7.2C4 6.0799 4 5.51984 4.21799 5.09202C4.40973 4.71569 4.71569 4.40973 5.09202 4.21799C5.51984 4 6.07989 4 7.2 4H16.8C17.9201 4 18.4802 4 18.908 4.21799C19.2843 4.40973 19.5903 4.71569 19.782 5.09202C20 5.51984 20 6.0799 20 7.2V16.4934M17 8.99989C17 10.1045 16.1046 10.9999 15 10.9999C13.8954 10.9999 13 10.1045 13 8.99989C13 7.89532 13.8954 6.99989 15 6.99989C16.1046 6.99989 17 7.89532 17 8.99989Z"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ "--darkreader-inline-stroke": "#ece8e2" }}
                    data-darkreader-inline-stroke=""
                  ></path>
                </g>
              </svg>
              </Link>
              <Link to="/create-post">
                  <svg width="35" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M9.16488 17.6505C8.92513 17.8743 8.73958 18.0241 8.54996 18.1336C7.62175 18.6695 6.47816 18.6695 5.54996 18.1336C5.20791 17.9361 4.87912 17.6073 4.22153 16.9498C3.56394 16.2922 3.23514 15.9634 3.03767 15.6213C2.50177 14.6931 2.50177 13.5495 3.03767 12.6213C3.23514 12.2793 3.56394 11.9505 4.22153 11.2929L7.04996 8.46448C7.70755 7.80689 8.03634 7.47809 8.37838 7.28062C9.30659 6.74472 10.4502 6.74472 11.3784 7.28061C11.7204 7.47809 12.0492 7.80689 12.7068 8.46448C13.3644 9.12207 13.6932 9.45086 13.8907 9.7929C14.4266 10.7211 14.4266 11.8647 13.8907 12.7929C13.7812 12.9825 13.6314 13.1681 13.4075 13.4078M10.5919 10.5922C10.368 10.8319 10.2182 11.0175 10.1087 11.2071C9.57284 12.1353 9.57284 13.2789 10.1087 14.2071C10.3062 14.5492 10.635 14.878 11.2926 15.5355C11.9502 16.1931 12.279 16.5219 12.621 16.7194C13.5492 17.2553 14.6928 17.2553 15.621 16.7194C15.9631 16.5219 16.2919 16.1931 16.9495 15.5355L19.7779 12.7071C20.4355 12.0495 20.7643 11.7207 20.9617 11.3787C21.4976 10.4505 21.4976 9.30689 20.9617 8.37869C20.7643 8.03665 20.4355 7.70785 19.7779 7.05026C19.1203 6.39267 18.7915 6.06388 18.4495 5.8664C17.5212 5.3305 16.3777 5.3305 15.4495 5.8664C15.2598 5.97588 15.0743 6.12571 14.8345 6.34955"
                      stroke="#000000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      style={{ "--darkreader-inline-stroke": "#ece8e2" }}
                      data-darkreader-inline-stroke=""
                    ></path>
                  </g>
                </svg>
              </Link>
        </div>

          <div className="sort-options">
            <ul>
              <li>Best</li>
              <li>Hot</li>
              <li>New</li>
              <li>Top</li>
              <li>...</li>
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