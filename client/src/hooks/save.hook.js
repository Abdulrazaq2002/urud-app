import React from "react";
import { toast } from "react-hot-toast";

export default function SaveHook() {
  const save = async (
    postId,
    description,
    setIsEdit,
    setPosts,
    posts,
    setSelectedPostId
  ) => {
    try {
      const res = await fetch(`/api/post/${postId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });
      if (!res.ok) {
        throw new Error("Failed to update post");
      }
      setIsEdit(false);
      const updatedPost = await res.json();
      const updatedPosts = posts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      );
      setPosts(updatedPosts);
      toast.success("Post updated successfully");
      setSelectedPostId(null); // Reset selected post ID after saving
    } catch (error) {
      toast.error(error.message);
    }
  };
  return { save };
}
