import React from "react";
import Logout from "./logout";
import { toast } from "react-hot-toast";
import { userAuthContext } from "../context/auth.context";

export default function Delete() {
  const { authUser, setAuthUser } = userAuthContext();
  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/delete/${authUser._id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      setAuthUser(null);

      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error(error.message);
    }
    toast.success("Account Deleted Successfully");
  };

  return (
    <div className='max-w-md mx-auto mt-8'>
      <h1 className='mb-5'>
        <b>
          Hey! <u>{authUser.fullname}</u>2 help you to logout or delete
        </b>
      </h1>
      <button
        onClick={handleDelete}
        className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out'>
        Delete Your Account
      </button>
      <Logout />
    </div>
  );
}
