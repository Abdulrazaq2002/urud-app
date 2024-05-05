import React from "react";
import Home from "./pages/home";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import Authpage from "./pages/authpage";
import Login from "./auth/login";
import Signin from "./auth/signin";
import { Toaster } from "react-hot-toast";
import { userAuthContext } from "./context/auth.context.jsx";
import Delete from "./auth/delete";
import Profile from "./pages/profile";
import PostForm from "./pages/postForm";
import CurrentUserPost from "./pages/currentuserpost";
import UserData from "./pages/userData";
import Search from "./components/search";

export default function App() {
  const { authUser } = userAuthContext();
  return (
    <>
      <Toaster />

      <Router>
        <Header />
        <Routes>
          <Route path='/' element={authUser ? <Home /> : <Authpage />} />
          <Route path='/auth' element={<Authpage />} />
          <Route
            path='/login'
            element={authUser ? <Navigate to={"/"} /> : <Login />}
          />
          <Route
            path='/post'
            element={authUser ? <PostForm /> : <Navigate to={"/"} />}
          />
          <Route
            path='/signin'
            element={authUser ? <Navigate to={"/"} /> : <Signin />}
          />
          <Route
            path='/delete'
            element={authUser ? <Delete /> : <Authpage />}
          />
          <Route
            path='/userdata'
            element={authUser ? <Profile /> : <Navigate to={"/"} />}
          />
          <Route path='/userpost' element={<CurrentUserPost />} />
          <Route path='/profile' element={<UserData />} />
          <Route
            path='/explore'
            element={authUser ? <Search /> : <Navigate to={"/"} />}
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}
