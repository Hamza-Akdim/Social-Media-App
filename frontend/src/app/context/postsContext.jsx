"use client";
import React, { createContext, useState, useContext } from "react";
import { useAuthContext } from "./authContext";

const PostContext = createContext();

export const usePostContext = () => useContext(PostContext);

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const { token } = useAuthContext();
  const fetchPosts = async (userId) => {
    try {
      const response = await fetch(`http://localhost:4001/api/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  return (
    <PostContext.Provider value={{ posts, fetchPosts }}>
      {children}
    </PostContext.Provider>
  );
};
