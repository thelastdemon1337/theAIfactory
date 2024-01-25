import React, { useState } from "react";
import { useUserContext } from "../../context/userContext";
import { builder } from "../../utils/sanity";
import { useNavigate } from "react-router-dom";

const ProductModal = ({
  isOpen,
  closeModal,
  data,
  isLikedByCurrentUser,
  handleIsLikedByCurrentUser,
}) => {
  console.log(data);
  const {
    videoLink,
    features,
    price,
    name,
    tags,
    accessNow,
    bookmark,
    description,
    likes,
    _id,
    category,
    image,
    _updatedAt,
    isChatBot,
    API_KEY,
    toolURL
  } = data;
  const { currentUser, updateUser } = useUserContext();
  const formattedDate = new Date(_updatedAt).toLocaleString();
  const navigate = useNavigate();

  function urlFor(source) {
    return builder.image(source);
  }

  const handlefavouriteButton = (id) => {
    const isAlreadyLiked = currentUser?.favouriteTools.includes(id);

    if (isAlreadyLiked) {
      handleIsLikedByCurrentUser((prev) =>
        prev.filter((toolId) => toolId !== id)
      );
    } else {
      handleIsLikedByCurrentUser((prev) => [...prev, id]);
    }

    const updatedFavouriteTools = isAlreadyLiked
      ? currentUser?.favouriteTools.filter((toolId) => toolId !== id)
      : [...currentUser?.favouriteTools, id];

    updateUser({
      favouriteTools: updatedFavouriteTools,
    });
  };

  const handleAccessNowButton = () => {
    window.open(toolURL, '_blank');
  };

  return (
    <>
      <div
        className={`fixed inset-0 ${
          isOpen ? "flex" : "hidden"
        } items-center justify-center bg-gray-500 bg-opacity-75 z-50 overflow-y-scroll`}
      >
        <div className="flex flex-col md:flex-row w-full max-w-6xl h-full p-6 bg-black rounded-lg shadow-lg overflow-y-auto">
          <div className="md:w-1/2 h-full p-4 rounded-md mx-2 mb-4 md:mb-0">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-4xl text-white font-extrabold">{name}</h3>
              <button
                onClick={closeModal}
                className="text-gray-100 focus:outline-none"
              >
                Close
              </button>
            </div>
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              {tags && tags.length > 0 && (
                <div className="flex items-center space-x-1">
                  {tags.map((tag, index) => (
                    <div
                      className="text-md px-1 font-bold text-white dark:text-white"
                      key={index}
                    >
                      #{tag}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="my-8">
              <p className="text-gray-100 overflow-clip">{description}</p>
            </div>
            <div className="flex space-x-8">
              <div className="px-4 py-2.5 bg-gray-700 rounded-md flex items-center justify-center text-white">
                <span>Updated on {formattedDate.slice(0, 10)}</span>
              </div>
              <div className="px-4 py-2.5 bg-gray-700 rounded-md flex items-center justify-center text-white">
                <span>{category}</span>
              </div>
            </div>
            <div className="my-8">
              <h3 className="text-xl text-white font-semibold">Tokens</h3>
              <p className="text-gray-100">{price}</p>
            </div>
            <div className="flex my-8 items-center space-x-4">
              {isChatBot ? (
                <button
                 // onClick={() => navigate(`/ai-tools/chatgpt?key=${API_KEY}`)}
                 onClick={() => navigate(`/ai-tools/chatgpt?`)}
                  className="hover:scale-105 bg-[#FF9900] rounded-lg px-4 py-2.5"
                >
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    Access Chat Now
                  </span>
                </button>
              ) : (
                <button
                  onClick={handleAccessNowButton}
                  // onClick={()=>(navigate(`/ai-tools/chatgpt?key=${API_KEY}`))}
                  className="hover:scale-105 bg-[#FF9900] rounded-lg px-4 py-2.5"
                >
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    Access Now
                  </span>
                </button>
              )}

              <button
                onClick={() => handlefavouriteButton(_id)}
                className="flex items-end justify-center rounded-xl px-4"
                style={{
                  backgroundColor: "#FF9900",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={isLikedByCurrentUser?.includes(_id) ? "red" : "#FF9900"}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 my-auto"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
                <div className="text-black  bg-[#FF9900] font-medium rounded-lg text-sm ml-5 py-2.5 text-center">
                  {likes}
                </div>
              </button>
            </div>
          </div>
          <div className="md:w-1/2 h-full rounded-md ">
            <div className="mb-4">
              <img
                src={image && `${urlFor(image).width(800).height(600).url()}`}
                alt="ai-tool"
                className="w-full h-1/2 object-cover"
              />
            </div>
            <div className="p-6 w-full h-1/2 bg-black rounded-lg shadow-lg">
              <iframe
                title="Video"
                className="w-full h-full"
                src={
                  videoLink
                  // "https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&mute=1"
                }
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductModal;
