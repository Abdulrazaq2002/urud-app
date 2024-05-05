import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import SelectedImg from "../components/selectedImg";

export default function GetPost() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPost, setIsPost] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/post");
        if (!res.ok) {
          throw new Error(res.ok);
        }
        const data = await res.json();
        const shuffledPosts = shuffleArray(data);
        setPosts(shuffledPosts);
        setIsLoading(false);
        setIsPost(shuffledPosts.length > 0); // Update isPost based on whether posts are available
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchData();
  }, []);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  const openModel = (img) => {
    setSelectedImage(img);
  };
  const ImgUrl = `http://localhost:202/api/uploads/`;

  return (
    <>
      {!isLoading ? ( // Check if loading is finished
        isPost ? ( // Check if posts are available
          <div className='flex justify-between flex-wrap w-full max-w-5xl'>
            {posts.map((post, index) => (
              <div
                key={index}
                className='w-full md:w-1/3 p-2'
                onClick={() => openModel(ImgUrl + post.image)}>
                <div className='bg-white rounded-lg shadow-md'>
                  <img
                    src={ImgUrl + post.image}
                    alt=''
                    className='w-50 h-50 object-cover rounded-t-lg'
                  />

                  <div className='p-4'>
                    <p className='text-gray-700 overflow-hidden md:overflow-ellipsis capitalize'>
                      {post.description}
                    </p>
                    <p className='text-lg font-bold'>@{post.user}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          "Posts Not Available"
        )
      ) : (
        <div className='flex items-center justify-center min-h-screen'>
          <div className='flex items-center justify-center p-4 rounded-lg text-white bg-sky-500'>
            <svg
              className='animate-spin h-8 w-8 mr-3 text-white '
              viewBox='0 0 24 24'>
              <circle cx='12' cy='12' r='10' className='opacity-25' />
              <path
                fill='currentColor'
                d='M12 3v1m0 16v1m-5.93-5.93l.707-.707a8 8 0 0111.314 0l.707.707m-8.434-8.435l-.707-.707a8 8 0 010 11.314l.707.707'
              />
            </svg>
            <span className='text-white'>Server Loading..</span>
          </div>
        </div>
      )}
      {selectedImage && (
        <SelectedImg
          setSelectedImg={setSelectedImage}
          selectedImg={selectedImage}
        />
      )}
    </>
  );
}
