import React from "react";
import { toast } from "react-hot-toast";
import Logout from "../auth/logout";
import { Link } from "react-router-dom";
import PostForm from "./postForm";
import GetPost from "./getPost";

export default function Home() {
  return (
    <>
      <div>
        <GetPost />
      </div>
    </>
  );
}
