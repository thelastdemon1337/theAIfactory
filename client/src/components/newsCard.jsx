import React, { useState, useEffect } from "react";

import { getNews, builder } from "../utils/sanity";

const NewsCard = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function urlFor(source) {
    return builder.image(source);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getNews();

        if (response.length > 0) {
          setNewsData(response);
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

  // const news = [
  //   {
  //     id: 4,
  //     name: "New Technology Breakthrough",
  //     content:
  //       "Scientists make a groundbreaking discovery in the field of quantum computing.",
  //     price: 0,
  //     imageUrl: "https://v1.tailwindcss.com/img/card-top.jpg",
  //     likes: "87",
  //   },
  //   {
  //     id: 5,
  //     name: "Space Exploration Mission",
  //     content:
  //       "NASA announces plans for a new mission to explore distant planets in our solar system.",
  //     price: 0,
  //     imageUrl: "https://v1.tailwindcss.com/img/card-top.jpg",
  //     likes: "53",
  //   },
  //   {
  //       id: 4,
  //       name: "New Technology Breakthrough",
  //       content:
  //         "Scientists make a groundbreaking discovery in the field of quantum computing.",
  //       price: 0,
  //       imageUrl: "https://v1.tailwindcss.com/img/card-top.jpg",
  //       likes: "87",
  //     },
  //     {
  //       id: 5,
  //       name: "Space Exploration Mission",
  //       content:
  //         "NASA announces plans for a new mission to explore distant planets in our solar system.",
  //       price: 0,
  //       imageUrl: "https://v1.tailwindcss.com/img/card-top.jpg",
  //       likes: "53",
  //     },
  //     {
  //       id: 4,
  //       name: "New Technology Breakthrough",
  //       content:
  //         "Scientists make a groundbreaking discovery in the field of quantum computing.",
  //       price: 0,
  //       imageUrl: "https://v1.tailwindcss.com/img/card-top.jpg",
  //       likes: "87",
  //     },
  //     {
  //       id: 5,
  //       name: "Space Exploration Mission",
  //       content:
  //         "NASA announces plans for a new mission to explore distant planets in our solar system.",
  //       price: 0,
  //       imageUrl: "https://v1.tailwindcss.com/img/card-top.jpg",
  //       likes: "53",
  //     },
  // ];
  return (
    <>
      <div className="flex flex-wrap justify-center">
        {newsData.map((item) => (
          <div
            key={item._id}
            style={{ backgroundColor: "red" }}
            className="transition-transform transform hover:scale-105 mx-4 my-4 bg-red-700 border border-gray-200 rounded-lg shadow dark:bg-red-700 dark:border-red-700  w-full md:w-1/2 lg:w-1/3 xl:w-1/4 max-w-sm"
          >
            <a href="/">
              <img
                className="rounded-t-lg"
                style={{ objectFit: "contain" }}
                src={`${urlFor(item.image).width(800).height(600).url()}`}
                alt={item.name}
              />
            </a>
            <div className="px-5 py-3">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">
                  {item.title}
                </h5>
              </a>
              <p className="mb-3 font-normal text-white dark:text-gray-400">
                {item.content}
              </p>
              <div className="flex items-center justify-between">
                <a
                  href="#"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-yellow-300 rounded-lg hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Read more
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </a>
                <div className="flex items-center mt-2.5 mb-3">
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
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
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                    {item.likes}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default NewsCard;
