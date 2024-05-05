import React from "react";
import { Link } from "react-router-dom";

export default function Authpage() {
  return (
    <>
      <div className='flex flex-col items-center justify-center h-96'>
        <h1 className='text-3xl font-bold mb-4'>Register</h1>
        <button className='bg-white text-blue-700 hover:bg-blue-700 hover:text-white border border-blue-700 font-bold py-2 px-4 rounded mb-2'>
          <Link to='/login'>Already have an account? Login from here</Link>
        </button>
        <button className='bg-white text-green-700 hover:bg-green-700 hover:text-white border border-green-700 font-bold py-2 px-4 rounded'>
          <Link to='/signin'>Create a new account</Link>
        </button>
      </div>
    </>
  );
}
