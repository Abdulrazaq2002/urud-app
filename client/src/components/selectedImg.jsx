import React from "react";

export default function SelectedImg({ setSelectedImg, selectedImg }) {
  const closeModal = () => {
    setSelectedImg(null);
  };

  return (
    <div className='fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='w-full h-full max-w-screen-lg md:max-w-screen-xl mx-auto bg-transparent p-8 rounded-lg relative'>
        <img
          src={selectedImg}
          alt='Full-size Image'
          className='w-full h-auto max-h-full'
        />
        <button
          className='absolute top-8 right-8 text-black shadow-md shadow-black'
          onClick={closeModal}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
