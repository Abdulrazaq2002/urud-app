import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { userAuthContext } from "../context/auth.context";

export default function PostForm() {
  const { authUser } = userAuthContext();
  const [user, setUser] = useState(authUser.username);
  const [user_id, setUserId] = useState(authUser._id);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("user", user);
    formData.append("user_id", user_id);
    formData.append("description", description);
    formData.append("image", image);
    try {
      const res = await fetch("/api/post", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        throw new Error("Fail to upload post");
      }

      toast.success("Posted Successfully");
      setDescription("");
      setImage(null);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='bg-white border rounded-lg p-4'>
      <div className='mb-4'>
        <label
          htmlFor='description'
          className='block text-sm font-medium text-gray-700'>
          Description
        </label>
        <textarea
          id='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Write a caption...'
          className='mt-1 p-2 block w-full border-gray-200 border-[3px] rounded-md shadow-sm outline-none focus:border-sky-500 sm:text-sm'
          rows='3'></textarea>
      </div>
      <div className='mb-4'>
        <label
          htmlFor='image'
          className='block text-sm font-medium text-gray-700'>
          Image
        </label>
        <input
          type='file'
          id='image'
          accept='image/*'
          onChange={handleFileChange}
          className='mt-1 block w-full py-2 px-3 border-[3px] border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-sky-500 sm:text-sm'
        />
      </div>
      <button
        type='submit'
        className='inline-flex items-center px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white border-sky-500 border-[3px] bg-sky-500 hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
        <b>Submit</b>
      </button>
    </form>
  );
}
