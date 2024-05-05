import React from "react";
import { toast } from "react-hot-toast";
import { userAuthContext } from "../context/auth.context.jsx";

export default function Loginhook() {
  const { setAuthUser } = userAuthContext();
  const login = async ({ username, password }) => {
    const success = handleError({
      username,
      password,
    });
    if (!success) return;
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("user-data", JSON.stringify(data));
      setAuthUser(data);
      toast.success("Login Successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return { login };
}
function handleError({ username, password }) {
  if (!username || !password) {
    toast.error("Fill all the fields");
    return false;
  }
  return true;
}
