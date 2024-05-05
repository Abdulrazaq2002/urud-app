import React from "react";
import { toast } from "react-hot-toast";
import { userAuthContext } from "../context/auth.context.jsx";

export default function signinHook() {
  const { authUser, setAuthUser } = userAuthContext();
  const signin = async ({
    fullname,
    username,
    password,
    confirmpassword,
    gender,
  }) => {
    const success = handleError({
      fullname,
      username,
      password,
      confirmpassword,
      gender,
    });
    if (!success) return;
    try {
      const res = await fetch("/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname,
          username,
          password,
          confirmpassword,
          gender,
        }),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      //saving user in loal storage
      localStorage.setItem("user-data", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return { signin };
}

function handleError({
  fullname,
  username,
  password,
  confirmpassword,
  gender,
}) {
  if (!fullname || !username || !password || !confirmpassword || !gender) {
    toast.error("Fill All The Fields");
    return false;
  }

  if (password !== confirmpassword) {
    toast.error("Password Did't Match");
    return false;
  }

  return true;
}
