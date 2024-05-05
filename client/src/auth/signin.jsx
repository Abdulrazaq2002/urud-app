import React, { useState } from "react";
import toast from "react-hot-toast";
import signinHook from "../hooks/signin.hook";
import { Link } from "react-router-dom";

export default function Signin() {
  const { signin } = signinHook();
  const [userDetails, setUserDetails] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmpassword: "",
    gender: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signin(userDetails);
  };
  const handleChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit} className='max-w-md w-full mx-auto mt-5'>
        <div className='mb-4'>
          <input
            type='text'
            onChange={handleChange}
            value={userDetails.fullname}
            name='fullname'
            className='border-[3px] border-gray-300 focus:outline-none focus:border-sky-500 rounded-md py-2 px-4 w-full'
            placeholder='Full Name'
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
            value={userDetails.password}
            name='password'
            className='border-[3px] border-gray-300 focus:outline-none focus:border-sky-500 rounded-md py-2 px-4 w-full'
            placeholder='Password'
          />
        </div>
        <div className='mb-4'>
          <input
            type='password'
            onChange={handleChange}
            value={userDetails.confirmpassword}
            name='confirmpassword'
            className='border-[3px] border-gray-300 focus:outline-none focus:border-sky-500 rounded-md py-2 px-4 w-full'
            placeholder='Confirm Password'
          />
        </div>
        <div className='mb-4'>
          <input
            type='text'
            onChange={handleChange}
            name='gender'
            value={userDetails.gender}
            className='border-[3px] border-gray-300 focus:outline-none focus:border-sky-500 rounded-md py-2 px-4 w-full'
            placeholder='Gender'
          />
        </div>
        <p>
          <Link to='/login'>
            <b>
              Already have an account{" "}
              <u className='hover:text-red-500'>Login</u>
            </b>
          </Link>
        </p>
        <button
          type='submit'
          className='bg-sky-500 hover:bg-white hover:text-black text-white border-sky-500 border-[3px] font-bold py-2 px-4 rounded w-full'>
          <b>Sign in</b>
        </button>
      </form>
    </>
  );
}
