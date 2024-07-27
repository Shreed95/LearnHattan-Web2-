import React, { useState, useEffect } from 'react';
import { txtDB, imgDB } from '../../firebase';
import { ref, getDownloadURL } from 'firebase/storage';

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsRef = ref(realTimeDB, 'posts');
        const unsubscribe = onValue(postsRef, (snapshot) => {
          const postsData = snapshot.val();
          if (postsData) {
            const postsArray = Object.entries(postsData).map(([postId, post]) => ({
              id: postId,
              ...post,
            }));
            setPosts(postsArray);
          }
        });

        return () => {
          unsubscribe();
        };
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h2>Recent Posts</h2>
      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <p>{post.userId}:</p>
            <img src={post.imageUrl} alt="Post" />
            <p>{post.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
