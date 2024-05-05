import React from "react";
import { toast } from "react-hot-toast";

export default function DeletePostHook() {
  const deletePost = async (postId, description, image, setIsEdit) => {
    try {
      const res = await fetch(`/api/post/delete/${postId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, image }),
      });
      if (!res.ok) {
        throw new Error("Failed to delete post");
      }
      const data = await res.json();
      setIsEdit(false);

      toast.success("Post Delete Successsfully");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return { deletePost };
}
