import React from "react";
import { userAuthContext } from "../context/auth.context.jsx";
import { toast } from "react-hot-toast";

export default function Logouthook() {
  const { setAuthUser } = userAuthContext();
  const logout = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.removeItem("user-data");
      setAuthUser(null);
    } catch (error) {
      toast.error(error.message);
      console.error("Error at logout hook", error.message);
    }
  };
  return { logout };
}
