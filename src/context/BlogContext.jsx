import { createContext, useContext, useState, useEffect } from "react";

const PostContext = createContext();

export function PostProvider({ children }) {
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem("posts");
    return savedPosts ? JSON.parse(savedPosts) : [];
  });

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  const addPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]); // Newest first
  };

  const editPost = (postIndex, username, newTitle, newDesc) => {
    setPosts((prevPosts) =>
      prevPosts.map((post, index) =>
        index === postIndex && post.author === username
          ? {
              ...post,
              BlogTitle: newTitle,
              BlogDesc: newDesc,
              edited: true,
              timestamp: new Date().toLocaleString(),
            }
          : post
      )
    );
  };

  // ✅ Fix Likes (ensure new array)
  const toggleLike = (postIndex, username) => {
    setPosts((prevPosts) => {
      return prevPosts.map((post, index) => {
        if (index === postIndex) {
          const likes = post.likes || [];
          return {
            ...post,
            likes: likes.includes(username)
              ? likes.filter((user) => user !== username) // Unlike
              : [...likes, username], // Like
          };
        }
        return post;
      });
    });
  };

  // ✅ Fix Comments (ensure new array)
  const addComment = (postIndex, username, commentText) => {
    setPosts((prevPosts) => {
      return prevPosts.map((post, index) => {
        if (index === postIndex) {
          return {
            ...post,
            comments: [
              ...(post.comments || []),
              {
                username,
                text: commentText,
                timestamp: new Date().toLocaleString(),
              },
            ],
          };
        }
        return post;
      });
    });
  };

  // ✅ Fix Comment Deletion (ensure new array)
  const deleteComment = (postIndex, commentIndex, username) => {
    setPosts((prevPosts) => {
      return prevPosts.map((post, index) => {
        if (index === postIndex) {
          return {
            ...post,
            comments: post.comments?.filter(
              (_, cIndex) => cIndex !== commentIndex
            ),
          };
        }
        return post;
      });
    });
  };

  const deletePost = (postIndex, username) => {
    setPosts((prevPosts) =>
      prevPosts.filter(
        (post, index) => index !== postIndex || post.author !== username
      )
    );
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        setPosts,
        addPost,
        editPost,
        deletePost,
        toggleLike,
        addComment,
        deleteComment,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export function usePost() {
  return useContext(PostContext);
}
