import React from "react"; // Import React for creating components

export default function Footer() {
  return (
    <footer className='bg-gray-800 text-white p-4 mt-5 bottom-0 w-full'>
      <div className='container mx-auto'>
        {/* Informative description about URUD functionalities */}
        <p className='text-center'>
          URUD (Upload, Read, Update, Delete) is a set of functionalities that
          allow you to manage your data within the system. You can upload
          pictures, view your profile details, update your information, and
          delete unwanted data.
        </p>
        {/* Copyright with dynamic year */}
        <p className='text-center mt-2'>
          &copy; {new Date().getFullYear()} URUD
        </p>
      </div>
    </footer>
  );
}
