import React, { useState, useEffect } from "react";
import SigninPopup from "./popups/signinPopup";

import { getAitools, builder } from "../utils/sanity";
import { useUserContext } from "../context/userContext";

const ProductCard = () => {
  const { currentUser } = useUserContext();
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSignup, setShowSignup] = useState(false);

  function urlFor(source) {
    return builder.image(source);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAitools();

        if (response.length > 0) {
          setProductData(response);
          console.log(response);
        }

        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const products = [
    {
      _id: 1,
      name: "Apple Watch",
      description: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
      price: 599,
      imageUrl: "https://v1.tailwindcss.com/img/card-top.jpg",
      likes: "4",
    },
    {
      id: 2,
      name: "Apple TV",
      description: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
      price: 299,
      imageUrl: "https://v1.tailwindcss.com/img/card-top.jpg",
      likes: "34",
    },
    {
      id: 33,
      name: "Apple Iphone",
      description: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
      price: 799,
      imageUrl: "https://v1.tailwindcss.com/img/card-top.jpg",
      likes: "17",
    },
  ];

  const handleSignUpModal = (value) => {
    console.log(value);
    setShowSignup(value);
  };
  const handleAccessNowButton = () => {
    console.log(currentUser.age);
    if (currentUser.age === "") {
      handleSignUpModal(true);
    }
  };

  const handlefavouriteButton = () => {
    console.log(currentUser.age);
    if (currentUser.age === "") {
      handleSignUpModal(true);
    }
  };

  return (
    <>
      {showSignup && <SigninPopup setShowModal={handleSignUpModal} />}

      <div className="flex flex-wrap justify-center">
        {productData.map((product) => (
          <div
            key={product._id}
            style={{ backgroundColor: "red" }}
            className="transition-transform transform hover:scale-105 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 max-w-sm mx-4 my-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <a href="/">
              <img
                className="rounded-t-lg"
                style={{ objectFit: "contain" }}
                src={`${urlFor(product.image).width(800).height(600).url()}`}
                alt={product.name}
              />
            </a>
            <div className="px-5 py-3">
              <a href="/">
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
                <p className="text-md font-semibold tracking-tight text-gray-900 dark:text-white mt-4 mb-2">
                  {product.description}
                </p>
              </a>
              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                {product.tags && product.tags.length > 0 && (
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
                  onClick={handleAccessNowButton}
                  className="hover:scale-105 bg-[#FF9900] rounded-lg px-4 py-2.5"
                >
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    Access Now
                  </span>
                </button>

                <button
                  onClick={handlefavouriteButton}
                  className="flex items-end justify-center rounded-xl px-4"
                  style={{
                    backgroundColor: "#FF9900",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6  my-auto"
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
  );
};

export default ProductCard;
