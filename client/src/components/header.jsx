import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <nav className='bg-sky-500 border m-1 border-white rounded p-4'>
        <div className='flex flex-col sm:flex-row items-center justify-between'>
          <div className='flex items-center mb-2 sm:mb-0'>
            <Link
              to='/'
              className='text-white mr-4 hover:bg-sky-500 px-3 py-1 rounded hover:text-black'>
              <b>Home</b>
            </Link>
            <Link
              to='/explore'
              className='text-white mr-4 hover:bg-sky-500 px-3 py-1 rounded hover:text-black'>
              <b>Explore</b>
            </Link>
            <Link
              to='/post'
              className='text-white mr-4 hover:bg-sky-500 px-3 py-1 rounded hover:text-black'>
              <b>Post</b>
            </Link>
          </div>

          <Link
            to='/profile'
            className='text-sky-500 bg-gray-200 hover:text-black px-3 py-1 rounded'>
            <b>Profile</b>
          </Link>
        </div>
      </nav>
    </>
  );
}
