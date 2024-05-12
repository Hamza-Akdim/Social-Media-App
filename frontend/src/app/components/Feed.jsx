"use client";
import React, { useEffect, useState } from "react";
import Poste from "../components/Poste";
import PostFeature from "./PostFeature";
import { usePostContext } from "../context/postsContext";
import { useAuthContext } from "../context/authContext";

const Feed = () => {
  const { userId } = useAuthContext();
  const { posts, fetchPosts } = usePostContext();

  useEffect(() => {
    console.log(userId);
    console.log(posts);
    if (userId) {
      fetchPosts(userId);
    }
  }, [posts, userId]);

  return (
    <div className="flex flex-col">
      <PostFeature/>
      <div className="overflow-y-auto">
        {posts.map((post) => (
          <Poste
            key={post._id}
            name={post.userId.lastName}
            caption={post.description}
            profilePic=""
            src={post.picturePath}
            likes={Object.keys(post.likes).length}
            comments=""
            share=""
          />
        ))}
      </div>
    </div>
  );
};

export default Feed;
