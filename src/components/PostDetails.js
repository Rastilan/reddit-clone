import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { firestore } from './Firebase';

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    // Fetch post details from Firebase Firestore
    const fetchPostDetails = async () => {
      try {
        const postRef = firestore.collection('posts').doc(postId);
        const doc = await postRef.get();

        if (doc.exists) {
          setPost(doc.data());
        } else {
          console.log('Post not found');
        }
      } catch (error) {
        console.log('Error fetching post details:', error);
      }
    };

    fetchPostDetails();
  }, [postId]);

  if (!post) {
    return <div>Loading post...</div>;
  }

  return (
    <div>
      <h1>Post Details</h1>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
    </div>
  );
};

export default PostDetails;