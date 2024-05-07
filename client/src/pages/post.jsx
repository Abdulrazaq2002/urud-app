import React, { useState } from "react";
import { toast } from "react-hot-toast";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../components/firebase";
import { userAuthContext } from "../context/auth.context";

export default function Post() {
  const { authUser } = userAuthContext();
  const [img, setImage] = useState(null);
  const [user, setUser] = useState(authUser.username);
  const [user_id, setUserId] = useState(authUser._id);
  const [description, setDescription] = useState("");

  //uploading file to firebase google
  const uploadFile = async (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, "images/" + fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    try {
      await uploadTask;
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading file:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!img) {
      toast.error("Please select an image");
      return;
    }

    try {
      const imageUrl = await uploadFile(img);
      const postData = { image: imageUrl, description, user, user_id };

      // Making the fetch POST request
      const response = await fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error("Failed to upload post");
      }

      toast.success("Post uploaded successfully");
      setDescription("");
      setImage(null);
    } catch (error) {
      toast.error("Failed to upload post");
      console.error("Error:", error);
    }
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='file'
        id='image'
        accept='image/*'
        onChange={handleFileChange}
        className='mt-1 block w-full py-2 px-3 border-[3px] border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-sky-500 sm:text-sm'
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder='Write a description...'
        className='mt-4 p-2 block w-full border-gray-200 border-[3px] rounded-md shadow-sm outline-none focus:border-sky-500 sm:text-sm'
        rows='3'></textarea>
      <button
        type='submit'
        className='mt-4 inline-flex items-center px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white border-sky-500 border-[3px] bg-sky-500 hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
        <b>Post</b>
      </button>
    </form>
  );
}
