// PostPage.js
import React, { useState, useEffect } from "react";
import PostForm from "./PostForm";
import PostList from "./PostList";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth } from "firebase/auth";
import "./PostPage.css";
import "../Sidebar";
import Sidebar from "../Sidebar";
const PostPage = () => {
  const [user, setUser] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const openPopup = () => {
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <>
      <div className="postsidebar">
        <Sidebar />
      </div>
      <div className="Postpage-container">
        {/* Popup for creating a new post */}
        <div className={`popup ${isPopupVisible ? "visible" : ""}`}>
          <PostForm user={user} closePopup={closePopup} />
        </div>

        <button className="postCenterButton" onClick={openPopup}>
          Add Post
        </button>
        <PostList />
      </div>
    </>
  );
};

export default PostPage;
