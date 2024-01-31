import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import SigninPopup from "../popups/signinPopup";
import AvailabilityMessage from "../AvailibilityMessage";
import { getAitools, builder } from "../../utils/sanity";
import { useUserContext } from "../../context/userContext";
import ProductModal from "../modals/productModal";

const AIToolsCard = ({
  data,
  query,
  categoryQuery,
  showGlobalTools,
  handleShowGlobalTools,
  showAllCategories,
  handleShowAllCategories,
}) => {
  const { currentUser, updateUser } = useUserContext();
  const [productData, setProductData] = useState();
  const [isLikedByCurrentUser, setIsLikedByCurrentUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSignup, setShowSignup] = useState(false);
  const [showAvailibilityMessage, setShowAvailibilityMessage] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const dateQuery = searchParams.get("date");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toolData, setToolData] = useState({});

  const openProductModal = () => {
    setIsModalOpen(true);
  };

  const closeProductModal = () => {
    setIsModalOpen(false);
    setToolData({});
  };

  function urlFor(source) {
    return builder.image(source);
  }

  const handleProducts = (value) => {
    console.log(value.length);
    setProductData(value);
  };

  const handleIsLikedByCurrentUser = (value) => {
    setIsLikedByCurrentUser(value);
  };

  const filterByCategory = (data, category) => {
    if (!category) {
      return data;
    }
    const filteredData = data.filter((item) => item.category === category);
    return filteredData;
  };

  useEffect(() => {
    try {
      if (!data.length) return;
      if (query && data.length > 0) {
        console.log(query);
        const filteredPosts = data.filter((post) =>
          post.name.toLowerCase().includes(query.toLowerCase())
        );
        setProductData(filteredPosts);
        console.log(filteredPosts);
      } else if (dateQuery === "today" && data.length > 0) {
        if (dateQuery === "today") {
          console.log(1);
          const currentDate = new Date().toISOString().split("T")[0];
          const filteredData = data.filter((post) => {
            return post.publicationDate.split("T")[0] === currentDate;
          });
          if (!filteredData.length && filteredData.length === 0) {
            setShowAvailibilityMessage(true);
            return;
          }
          setProductData(filteredData);
          setLoading(false);
        }
      } else if (categoryQuery && data.length > 0) {
        console.log(categoryQuery);
        const filteredData = filterByCategory(data, categoryQuery);
        setProductData(filteredData);
      } else {
        setProductData(data);
      }

      const commonElements = data.filter((obj2) =>
        currentUser?.favouriteTools.includes(obj2._id)
      );
      const ids = commonElements.map((obj) => obj._id);
      setIsLikedByCurrentUser(ids);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [data, query, dateQuery, categoryQuery]);

  const handleSignUpModal = (value) => {
    console.log(value);
    setShowSignup(value);
  };

  const handleAccessNowButton = (product) => {
    if (currentUser?.age === "") {
      handleSignUpModal(true);
    }
    setToolData(product);
    openProductModal();
  };

  const handlefavouriteButton = (id) => {
    if (currentUser?.email === "") {
      handleSignUpModal(true);
      return;
    }
    const isAlreadyLiked = currentUser?.favouriteTools.includes(id);

    if (isAlreadyLiked) {
      setIsLikedByCurrentUser((prev) => prev.filter((toolId) => toolId !== id));
    } else {
      setIsLikedByCurrentUser((prev) => [...prev, id]);
    }

    const updatedFavouriteTools = isAlreadyLiked
      ? currentUser?.favouriteTools.filter((toolId) => toolId !== id)
      : [...currentUser?.favouriteTools, id];

    updateUser({
      favouriteTools: updatedFavouriteTools,
    });
  };

  //dummy data
  const modalData = {
    videoUrl: "https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&mute=1",
    features: ["Feature 1", "Feature 2", "Feature 3"],
    price: "$19.99",
    name: "Product Name",
    tags: ["Tag1", "Tag2", "Tag3"],
    accessNow: "Access Now",
    bookmark: "Bookmark",
    "-id": "sf",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in justo eu odio auctor blandit.",
    likes: "33",
  };

  return (
    <>
      <div className="bg-black">
        {showSignup && <SigninPopup setShowModal={handleSignUpModal} />}
        {showAvailibilityMessage && <AvailabilityMessage value={"Tools"} />}

        {!showAllCategories && !showAvailibilityMessage && (
          <div>
            {!showGlobalTools && (
              <>
                <div className="mx-auto my-4 px-3 flex items-start justify-start lg:px-8">
                  <h3 className="text-xl font-semibold text-white ">
                    Trending Tools
                  </h3>
                </div>
                <div className="flex flex-wrap justify-center">
                  {productData?.slice(0, 5).map((product) => (
                    <div
                      key={product._id}
                      style={{
                        backgroundColor: "red",
                        width: "22rem",
                        height: "30rem",
                      }}
                      className="transition-transform transform hover:scale-105 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 max-w-sm mx-2 my-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                    >
                      <span onClick={() => handleAccessNowButton(product)}>
                        <img
                          className="rounded-t-lg"
                          style={{ objectFit: "contain" }}
                          src={`${urlFor(product.image)
                            .width(800)
                            .height(600)
                            .url()}`}
                          alt={product.name}
                        />
                      </span>
                      <div className="px-5 py-3">
                        <span>
                          <h5 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
                            {product.name}
                          </h5>
                          <div className="flex items-center mt-2.5 mb-3">
                            <div className="flex items-center space-x-1 rtl:space-x-reverse">
                              <svg
                                className="w-4 h-4 text-yellow-300"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 22 20"
                              >
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                              </svg>
                              <svg
                                className="w-4 h-4 text-yellow-300"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 22 20"
                              >
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                              </svg>
                              <svg
                                className="w-4 h-4 text-yellow-300"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 22 20"
                              >
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                              </svg>
                              <svg
                                className="w-4 h-4 text-yellow-300"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 22 20"
                              >
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                              </svg>
                              <svg
                                className="w-4 h-4 text-gray-200 dark:text-gray-600"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 22 20"
                              >
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                              </svg>
                            </div>
                            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                              5.0
                            </span>
                          </div>
                          <p className="text-sm font-semibold tracking-tight text-gray-900 dark:text-white mt-4 mb-2 overflow-hidden">
                            {product.description?.slice(0, 40)}
                          </p>
                        </span>
                        <div className="flex items-center space-x-1 rtl:space-x-reverse">
                          {product.tags &&
                            product.tags.length > 0 &&
                            product.tags !== "" && (
                              <div className="flex items-center space-x-1">
                                {product.tags.map((tag, index) => (
                                  <div
                                    className="text-md font-bold text-white dark:text-white"
                                    key={index}
                                  >
                                    #{tag}
                                  </div>
                                ))}
                              </div>
                            )}
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <button
                            onClick={() => handleAccessNowButton(product)}
                            className="hover:scale-105 bg-[#FF9900] rounded-lg px-4 py-2.5"
                          >
                            <span className="text-sm font-bold text-gray-900 dark:text-white">
                              Access Now
                            </span>
                          </button>

                          <button
                            onClick={() => handlefavouriteButton(product._id)}
                            className="flex items-end justify-center rounded-xl px-4"
                            style={{
                              backgroundColor: "#FF9900",
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill={
                                isLikedByCurrentUser.includes(product._id)
                                  ? "red"
                                  : "#FF9900"
                              }
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
                              {product.likes}
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            {showGlobalTools && (
              <>
                <div className="mx-auto my-4 flex px-3 items-start justify-start lg:px-8">
                  <h3 className="text-3xl font-bold text-white  "> AI Tools</h3>
                </div>
                <div className="flex flex-wrap justify-center">
                  {productData?.map((product) => (
                    <div
                      key={product._id}
                      style={{
                        backgroundColor: "red",
                        width: "22rem",
                        height: "30rem",
                      }}
                      className="transition-transform transform hover:scale-105 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 max-w-sm mx-2 my-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                    >
                      <span onClick={() => handleAccessNowButton(product)}>
                        <img
                          className="rounded-t-lg"
                          style={{ objectFit: "contain" }}
                          src={`${urlFor(product.image)
                            .width(800)
                            .height(600)
                            .url()}`}
                          alt={product.name}
                        />
                      </span>
                      <div className="px-5 py-3">
                        <span>
                          <h5 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
                            {product.name}
                          </h5>
                          <div className="flex items-center mt-2.5 mb-3">
                            <div className="flex items-center space-x-1 rtl:space-x-reverse">
                              <svg
                                className="w-4 h-4 text-yellow-300"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 22 20"
                              >
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                              </svg>
                              <svg
                                className="w-4 h-4 text-yellow-300"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 22 20"
                              >
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                              </svg>
                              <svg
                                className="w-4 h-4 text-yellow-300"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 22 20"
                              >
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                              </svg>
                              <svg
                                className="w-4 h-4 text-yellow-300"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 22 20"
                              >
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                              </svg>
                              <svg
                                className="w-4 h-4 text-gray-200 dark:text-gray-600"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 22 20"
                              >
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                              </svg>
                            </div>
                            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                              5.0
                            </span>
                          </div>
                          <p className="text-sm font-semibold tracking-tight text-gray-900 dark:text-white mt-4 mb-2 overflow-hidden">
                            {product.description?.slice(0, 40)}
                          </p>
                        </span>
                        <div className="flex items-center space-x-1 rtl:space-x-reverse">
                          {product.tags &&
                            product.tags.length > 0 &&
                            product.tags !== "" && (
                              <div className="flex items-center space-x-1">
                                {product.tags.map((tag, index) => (
                                  <div
                                    className="text-md font-bold text-white dark:text-white"
                                    key={index}
                                  >
                                    #{tag}
                                  </div>
                                ))}
                              </div>
                            )}
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <button
                            onClick={() => handleAccessNowButton(product)}
                            className="hover:scale-105 bg-[#FF9900] rounded-lg px-4 py-2.5"
                          >
                            <span className="text-sm font-bold text-gray-900 dark:text-white">
                              Access Now
                            </span>
                          </button>

                          <button
                            onClick={() => handlefavouriteButton(product._id)}
                            className="flex items-end justify-center rounded-xl px-4"
                            style={{
                              backgroundColor: "#FF9900",
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill={
                                isLikedByCurrentUser.includes(product._id)
                                  ? "red"
                                  : "#FF9900"
                              }
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
                              {product.likes}
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
        {!showSignup && currentUser?._id && (
          <ProductModal
            isOpen={isModalOpen}
            closeModal={closeProductModal}
            data={toolData}
            isLikedByCurrentUser={isLikedByCurrentUser}
            handleIsLikedByCurrentUser={handleIsLikedByCurrentUser}
          />
        )}
      </div>
    </>
  );
};

export default AIToolsCard;
