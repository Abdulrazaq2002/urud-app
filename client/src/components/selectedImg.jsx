import React from "react";

export default function SelectedImg({ setSelectedImg, selectedImg }) {
  const closeModal = () => {
    setSelectedImg(null);
  };

  return (
    <div className='fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='w-96 h-96 max-w-screen-lg md:max-w-screen-xl mx-auto bg-transparent rounded-lg relative'>
        <img
          src={selectedImg}
          alt='Full-size Image'
          className='absolute inset-0 object-contain cursor-pointer'
          onClick={closeModal}
        />
        <button
          className='absolute top-8 right-8 text-white shadow-md'
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
