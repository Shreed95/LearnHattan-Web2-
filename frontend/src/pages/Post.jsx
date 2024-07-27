// Posts.js

import React, { useState, useEffect } from 'react';
import {txtDB} from '../firebase' // Import your firebase configuration file

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const postsRef = txtDB.database().ref('posts');

    // Listen for changes in the "posts" collection
    postsRef.on('value', (snapshot) => {
      const postsData = snapshot.val();
      if (postsData) {
        // Convert the object of posts into an array
        const postsArray = Object.entries(postsData).map(([key, value]) => ({
          id: key,
          ...value,
        }));

        // Sort posts by timestamp in descending order
        postsArray.sort((a, b) => b.timestamp - a.timestamp);

        // Update the state with the sorted posts
        setPosts(postsArray);
      }
    });

    // Cleanup the event listener when the component unmounts
    return () => postsRef.off('value');
  }, []);

  return (
    <div>
      <h2>Recent Posts</h2>
      {/* Display posts */}
      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <p>{post.user}:</p>
            <p>{post.text}</p>
            {/* You can display additional post details here, like timestamp */}
          </div> 
        ))}
      </div>
    </div>
  );
};

export default Posts;