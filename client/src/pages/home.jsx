import React, { useState, useEffect } from "react";
import AgeInputForm from "../components/forms/AgeInputForm";
import { useUserContext } from "../context/userContext";
import CarousalHome from "../components/carousal";
import HomeFiltersButton from "../components/buttons/homeFilters";
import HomeSortButton from "../components/buttons/homeSort";
import NewsLetter from "../components/forms/newsLetter";
import { FaNewspaper } from "react-icons/fa";
import { FaTools } from "react-icons/fa";

const Home = () => {
  const { isAgeProvided, currentUser } = useUserContext();
  const googleLoggedIn = localStorage.getItem("googleLoggedIn");

  if (googleLoggedIn && !isAgeProvided) {
    return <AgeInputForm />;
  }

  return (
    <>
      <div>
        <div className=" mx-64 mt-32 text-white flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold mb-4">TheAIFactory</h1>
          <p className="text-lg mb-8">
            THE LARGEST AI TOOLS DIRECTORY, UPDATED DAILY
          </p>
          <div className="flex space-x-4 mb-8">
            <button
              type="button"
              class="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2"
            >
              <FaNewspaper className="mr-2"/>
              News Added Today
            </button>
            <button
              type="button"
              class="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 mb-2"
            >
             <FaTools className="mr-2"/>
             Tools Added Today
            </button>
          </div>
          <div className="flex flex-1 items-center w-5/6 justify-center sm:items-stretch sm:justify-start">
            <div className="relative w-full ">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search icon</span>
              </div>
              <input
                type="text"
                id="search-navbar"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
                // onChange={}
              />
            </div>
          </div>
          <div className="flex justify-between items-center w-5/6">
            <HomeFiltersButton/>
            <HomeSortButton/>
          </div>
          <div className="flex justify-center items-center w-5/6">
           <a href="/discover">
            View More
           </a>
          </div>
        </div>
        <NewsLetter/>
        {/* <CarousalHome /> */}
        {/* <ProductCard /> */}
      </div>
    </>
  );
};

export default Home;
