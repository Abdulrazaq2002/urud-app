import React from "react";
import { Link } from "react-router-dom";
import { userAuthContext } from "../context/auth.context";

export default function UserData() {
  const { authUser } = userAuthContext();
  return (
    <div className='flex flex-col md:flex-row justify-around p-4 bg-gray-100 border-t border-gray-200'>
      <h1>Hey! {authUser.fullname}</h1>
      <Link
        to='/userdata'
        className='text-gray-800 hover:text-sky-500 font-bold hover:bg-gray-200 px-4 py-2 rounded hover:underline md:mx-2 my-2 md:my-0'>
        Account Details
      </Link>
      <Link
        to='/delete'
        className='text-gray-800 hover:text-sky-500 font-bold hover:bg-gray-200 px-4 py-2 rounded hover:underline md:mx-2 my-2 md:my-0'>
        Logout
      </Link>
      <Link
        to='/userpost'
        className='text-gray-800 hover:text-sky-500 font-bold hover:bg-gray-200 px-4 py-2 rounded hover:underline md:mx-2 my-2 md:my-0'>
        Your Uploads
      </Link>
    </div>
  );
}
