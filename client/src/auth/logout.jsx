import React from "react";
import toast from "react-hot-toast";
import Logouthook from "../hooks/logout.hook";

export default function Logout() {
  const { logout } = Logouthook();

  const handleLogout = async () => {
    toast.success("Logout Successful");
    await logout();
  };

  return (
    <div className='mt-4'>
      <button
        onClick={handleLogout}
        className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out'>
        Logout
      </button>
    </div>
  );
}
