import React, { useEffect, useState } from "react";
import { realTimeDB } from "../../firebase";
import { onValue, ref } from "firebase/database";
import Post from "./Post";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const postsRef = ref(realTimeDB, "posts");

    const unsubscribe = onValue(postsRef, (snapshot) => {
      const postsData = snapshot.val();
      if (postsData) {
        const postsArray = Object.entries(postsData).map(([postId, post]) => ({
          id: postId,
          ...post,
        }));
        setPosts(postsArray.reverse());
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      {/* <h2>Posts</h2> */}
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
