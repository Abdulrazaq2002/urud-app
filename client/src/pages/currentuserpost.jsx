import React, { useEffect, useState } from "react";
import { userAuthContext } from "../context/auth.context";
import toast from "react-hot-toast";
import PostForm from "./postForm";
import SaveHook from "../hooks/save.hook";
import DeletePostHook from "../hooks/deletepost.hook";
import { Link } from "react-router-dom";

export default function CurrentUserPost() {
  const { authUser } = userAuthContext();
  const { save } = SaveHook();
  const { deletePost } = DeletePostHook();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const currentUserId = authUser._id;
  const [isPost, setIsPost] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null); // Step 1: Define state variable for selected post ID

  useEffect(() => {
    const fetchCurrentUserPosts = async () => {
      try {
        const res = await fetch(`/api/post`);
        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await res.json();
        const currentUserPosts = data.filter(
          (post) => post.user_id === currentUserId
        );
        setIsPost(currentUserPosts.length > 0);
        setPosts(currentUserPosts);
        setIsLoading(false);
      } catch (error) {
        console.error(error.message);
        setIsLoading(false);
      }
    };

    fetchCurrentUserPosts();
  }, [currentUserId]);

  const handleEdit = async (postId) => {
    setIsEdit(true);
    setSelectedPostId(postId); // Step 2: Set the selected post ID when editing
  };

  const handleSave = async (postId, description) => {
    save(postId, description, setIsEdit, setPosts, posts, setSelectedPostId);
  };

  const handleDelete = async (postId, description, image) => {
    window.location.reload();
    deletePost(postId, description, image, setIsEdit);
    try {
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      toast.error(error.message);
    }
  };
  const ImgUrl = `http://localhost:202/api/uploads/`;
  // console.log(posts.length);
  return (
    <>
      <div className='flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md'>
        <div className='flex items-center space-x-4 ml-10'>
          <p className='text-lg font-medium'>{authUser.username}</p>
          <p className='text-sm text-gray-500'>{posts.length} Posts</p>
        </div>
      </div>

      {isPost ? (
        <div className='flex items-center justify-center min-h-screen'>
          {isLoading ? (
            <div className='flex items-center justify-center'>
              <svg
                className='animate-spin h-5 w-5 mr-3 text-white bg-sky-500'
                viewBox='0 0 24 24'>
                <circle cx='12' cy='12' r='10' className='opacity-25' />
                <path
                  fill='currentColor'
                  d='M12 3v1m0 16v1m-5.93-5.93l.707-.707a8 8 0 0111.314 0l.707.707m-8.434-8.435l-.707-.707a8 8 0 010 11.314l.707.707'
                />
              </svg>
              <span className='text-indigo-500'>Processing...</span>
            </div>
          ) : (
            <>
              <div className='flex justify-between flex-wrap w-full max-w-5xl'>
                {posts.map((post, index) => (
                  <div key={index} className='w-full md:w-1/3 p-2'>
                    <div
                      className={`bg-white rounded-lg shadow-md ${
                        selectedPostId === post._id &&
                        "border-4 border-blue-500"
                      }`}>
                      {/* Step 3: Conditionally style the selected post */}
                      <img
                        src={ImgUrl + post.image}
                        alt=''
                        className='w-50 h-50 object-cover rounded-t-lg'
                      />
                      <div className='p-4'>
                        {isEdit ? (
                          <input
                            className='font-bold'
                            type='text'
                            value={post.description}
                            onChange={(e) => {
                              const updatedPosts = [...posts];
                              updatedPosts[index].description = e.target.value;
                              setPosts(updatedPosts);
                            }}
                          />
                        ) : (
                          <p className='text-gray-700 overflow-hidden md:overflow-ellipsis capitalize'>
                            <b> {post.description}</b>
                          </p>
                        )}
                      </div>
                      {isEdit ? (
                        <button
                          className='border-green-500 border-[3px] p-2 rounded-lg hover:bg-green-500 w-full hover:text-white'
                          onClick={() =>
                            handleSave(post._id, post.description)
                          }>
                          Save
                        </button>
                      ) : (
                        <>
                          <button
                            className='border-sky-500 border-[3px] p-2 rounded-lg hover:bg-sky-500 w-full hover:text-white'
                            onClick={() => handleEdit(post._id)}>
                            <b>Edit</b>
                          </button>
                          <button
                            className='border-red-500 border-[3px] p-2 rounded-lg hover:bg-red-500 w-full mt-3 hover:text-white'
                            onClick={() => handleDelete(post._id)}>
                            <b>Delete</b>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      ) : (
        <>
          <h1>You Have No Post</h1>
          <Link to='/post'>Upload</Link>
        </>
      )}
    </>
  );
}
