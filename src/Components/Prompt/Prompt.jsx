import React from "react";
import { Myprovider } from "../AI_Context/AiContext";
import { FaCopy } from "react-icons/fa"; // Icon for copy

const Prompt = () => {
  const { question, answer, loader, copyToClipboard } = Myprovider();

  return (
    <div className="lg:w-[50rem] sm:w-96 flex flex-col items-center">
      <div className="lg:w-10/12 sm:w-96 flex items-center gap-2 p-3 bg-blue-100 rounded shadow-md mb-4">
        <div className="w-10 h-10 flex justify-center items-center rounded-full">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDrs-0HLtv6pOKjkX0sDAfskoGGHnQJiEr_VlwgyjcWA&s"
            className="w-screen rounded-full"
            alt="User Avatar"
          />
        </div>
        <div>
          <h1 className="font-semibold">{question}</h1>
        </div>
      </div>

      <div className="lg:w-10/12 sm:w-[25rem] h-96 flex flex-col gap-2 p-3 overflow-auto relative bg-white p-4 rounded shadow-md">
        {/* Loader Display */}
        {loader ? (
          <div className="loader-container flex justify-center items-center h-full">
            <span className="loader"></span>
          </div>
        ) : (
          <div className="relative text-md text-wrap font-serif my-7 bg-gray-100 p-4 rounded shadow">
            {answer}
          </div>
        )}

        {/* Copy Button Positioned at Top Right */}
        <button
          className="absolute top-2 right-2 bg-gray-100 p-2 rounded-full shadow hover:bg-gray-200"
          onClick={copyToClipboard}
        >
          <FaCopy className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default Prompt;
