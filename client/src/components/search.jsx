import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import SelectedImg from "./selectedImg";

export default function Search() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // State to track selected image

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post");
        if (!res.ok) {
          throw new Error(res.ok);
        }
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchPosts();
  }, []);

  const searchFilter = posts.filter((post) =>
    post.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const ImgUrl = `http://localhost:202/api/uploads/`;

  const openModal = (img) => {
    setSelectedImage(img);
  };

  //   const closeModal = () => {
  //     setSelectedImage(null);
  //   };

  return (
    <div className='container mx-auto px-4'>
      <input
        type='search'
        className='w-full bg-gray-200 text-gray-800 rounded-md py-2 px-4 mb-4'
        placeholder='Search'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {searchFilter.map((post, index) => (
          <div
            key={index}
            className='border border-gray-300 rounded-md overflow-hidden'
            onClick={() => openModal(ImgUrl + post.image)} // Open modal on image click
          >
            <img
              src={ImgUrl + post.image}
              alt='Search Result'
              className='w-full h-56 object-cover cursor-pointer'
            />
            <div className='p-4'>
              <h1 className='text-lg font-bold capitalize'>
                {post.description}
              </h1>
            </div>
          </div>
        ))}
      </div>
      {/* Modal for displaying full-size image */}
      {selectedImage && (
        <SelectedImg
          setSelectedImg={setSelectedImage}
          selectedImg={selectedImage}
        />
      )}
    </div>
  );
}
