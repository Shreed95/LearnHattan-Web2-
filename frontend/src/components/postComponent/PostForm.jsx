// PostForm.js
import React, { useState } from 'react';
import { auth, realTimeDB, imgDB } from '../../firebase';
import { ref as databaseRef, push, set } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import './PostForm.css';

const PostForm = ({ user, closePopup }) => {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handlePost = async () => {
    if (user && (description.trim() !== '' || image)) {
      try {
        const postsRef = databaseRef(realTimeDB, 'posts');
        const newPostRef = push(postsRef);
        const postId = newPostRef.key;

        let imageUrl = null;
        if (image) {
          const imagesRef = storageRef(imgDB, `images/${postId}`);
          await uploadBytes(imagesRef, image);
          imageUrl = await getDownloadURL(imagesRef);
        }

        await set(newPostRef, {
          userId: auth.currentUser.uid,
          description: description,
          imageUrl: imageUrl,
          reactions: [],
          timestamp: Date.now(),
        });

        setDescription('');
        setImage(null);
        closePopup(); // Close the popup after posting
      } catch (error) {
        console.error('Error creating post:', error);
      }
    }
  };

  const handleCancel = () => {
    setDescription('');
    setImage(null);
    closePopup(); // Close the popup without posting
  };

  return (
    <div className="post-form-container">
      <h2>Create a New Post</h2>
      <label>
        <span>Upload Image:</span>
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </label>
      <label>
        <span>Description:</span>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write your post description here..."
        />
      </label>
      <button onClick={handlePost}>Post</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default PostForm;