import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { userAuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import Logout from "../auth/logout";
import Delete from "../auth/delete";

export default function Profile() {
  const { authUser, setAuthUser } = userAuthContext();
  const [userDetails, setUserDetails] = useState({
    fullname: "",
    username: "",
    currentPassword: "",
  });

  useEffect(() => {
    const { fullname, username } = authUser;
    setUserDetails({
      fullname: fullname || "",
      username: username || "",
    });
  }, [authUser]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { fullname, username, currentPassword } = userDetails;

      // Construct the request body based on the fields being updated
      const requestBody = {
        fullname,
        username,
      };
      // Include the password field only if a new password is provided
      if (currentPassword) {
        requestBody.password = currentPassword;
      }

      const res = await axios.patch(`/api/signin/${authUser._id}`, requestBody);
      const updatedUser = res.data.updatedUser;
      setAuthUser(updatedUser); // Update authUser in context
      localStorage.setItem("user-data", JSON.stringify(updatedUser)); // Update authUser in local storage
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.response.data.error || "Error updating profile");
    }
  };

  const handleChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <form onSubmit={handleUpdate} className='max-w-md w-full mx-auto mt-5'>
        <div className='mb-4'>
          <input
            type='text'
            onChange={handleChange}
            value={userDetails.fullname}
            name='fullname'
            className='border-[3px] border-gray-300 focus:outline-none focus:border-sky-500  rounded-md py-2 px-4 w-full'
            placeholder='Fullname'
          />
        </div>
        <div className='mb-4'>
          <input
            type='text'
            onChange={handleChange}
            value={userDetails.username}
            name='username'
            className='border-[3px] border-gray-300 focus:outline-none focus:border-sky-500 rounded-md py-2 px-4 w-full'
            placeholder='Username'
          />
        </div>
        <div className='mb-4'>
          <input
            type='password'
            onChange={handleChange}
            value={userDetails.currentPassword}
            name='currentPassword'
            className='border-[3px] border-gray-300 focus:outline-none focus:border-sky-500 rounded-md py-2 px-4 w-full'
            placeholder='Current Password'
          />
        </div>

        <button
          type='submit'
          className='bg-sky-500 hover:bg-white hover:text-black text-white border-sky-500 border-[3px] font-bold py-2 px-4 rounded w-full'>
          Update
        </button>
      </form>
    </>
  );
}
