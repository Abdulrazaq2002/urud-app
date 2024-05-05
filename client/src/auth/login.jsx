import React, { useState } from "react";
import toast from "react-hot-toast";
import Loginhook from "../hooks/log.inhook";
import { Link } from "react-router-dom";

export default function Login() {
  const { login } = Loginhook();
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(userDetails);
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
        <p>
          <Link to='/signin'>
            <b>
              Don't have an account <u className='hover:text-red-500'>Signin</u>
            </b>
          </Link>
        </p>
        <button
          type='submit'
          className='bg-sky-500 hover:bg-white hover:text-black text-white border-sky-500 border-[3px] font-bold py-2 px-4 rounded w-full'>
          <b>Login</b>
        </button>
      </form>
    </>
  );
}
