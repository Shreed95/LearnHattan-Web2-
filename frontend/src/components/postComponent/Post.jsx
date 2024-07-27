// Post.js
import React, { useState } from 'react';
import { auth, realTimeDB } from '../../firebase';
import { ref, update } from 'firebase/database';
import './Post.css';

const Post = ({ post }) => {
  const initialReactions = post.reactions || []; // Handle undefined reactions
  const [isReacted, setIsReacted] = useState(initialReactions.includes(auth.currentUser?.uid));

  const handleReact = async () => {
    try {
      const postsRef = ref(realTimeDB, `posts/${post.id}`);

      if (isReacted) {
        const updatedReactions = initialReactions.filter((userId) => userId !== auth.currentUser.uid);
        await update(postsRef, {
          reactions: updatedReactions,
        });
      } else {
        const updatedReactions = [...initialReactions, auth.currentUser.uid];
        await update(postsRef, {
          reactions: updatedReactions,
        });
      }

      setIsReacted(!isReacted);
    } catch (error) {
      console.error('Error updating reactions:', error);
    }
  };

  return (
    <div className="post-container">
      <p>{post.userId}:</p>
      {post.imageUrl && <img src={post.imageUrl} alt="Post" />}
      <p>{post.description}</p>
      <button onClick={handleReact}>
        {isReacted ? 'Remove Reaction' : 'React'}
      </button>
      <p>Reactions: {initialReactions.length}</p>
    </div>
  );
};

export default Post;