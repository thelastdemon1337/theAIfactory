import React, { useState } from "react";
import HomeFiltersButton from "./buttons/homeFilter";
import HomeSortButton from "../components/buttons/homeSort";
import SearchCategoryBar from "./buttons/searchCategoryBar";
import { FaNewspaper } from "react-icons/fa";
import { FaTools } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const HomeSearch = () => {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState("");
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  const handleFilter = (value) => {
    console.log(value);
    setFilters(value);
  };

  const handleSort = (value) => {
    console.log(value);
    setSort(value);
  };

  const handleCategory = (value) => {
    console.log(value);
    navigate(`/ai-tools/?query=${encodeURIComponent(value)}`);
    setCategory(value);
  };

  const handleNewsAddedToday = () => {
    navigate(`/discover/news?date=${encodeURIComponent("today")}`);
    console.log(search);
  };

  const handleToolsAddedToday = () => {
    navigate(`/tools?date=${encodeURIComponent("today")}`);
    console.log(search);
  };

  const handleSearch = () => {
    let queryParams = "";

    if (search) {
      queryParams += `query=${encodeURIComponent(search)}`;
    }

    if (filters) {
      queryParams += `${queryParams ? "&" : ""}filters=${encodeURIComponent(
        filters
      )}`;
    }

    if (sort) {
      queryParams += `${queryParams ? "&" : ""}sort=${encodeURIComponent(
        sort
      )}`;
    }
    if (category) {
      queryParams += `${queryParams ? "&" : ""}categories=${encodeURIComponent(
        category
      )}`;
    }

    navigate(`/tools/${queryParams ? `?${queryParams}` : ""}`);
  };

  return (
    <>
      <div>
        <div className="mx-4 mt-12 text-white text-center flex flex-col justify-center items-center sm:mx-8 lg:mx-16">
          {/* <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
            TheAIFactory
          </h1> */}
          <p className="text-sm sm:text-base lg:text-lg mb-4">
            THE LARGEST AI TOOLS DIRECTORY, UPDATED DAILY
          </p>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-4 ">
            <button
              type="button"
              onClick={handleNewsAddedToday}
              className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2"
            >
              <FaNewspaper className="mr-2" />
              News Added Today
            </button>
            <button
              type="button"
              onClick={handleToolsAddedToday}
              className="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 mb-2"
            >
              <FaTools className="mr-2" />
              Tools Added Today
            </button>
          </div>
          <div className="w-full sm:w-5/6 lg:w-3/4 xl:w-2/3">
            <div className="relative w-full flex flex-row">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>
              <input
                type="text"
                id="search-navbar"
                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md ml-2 w-full sm:w-1/6 sm:mt-0"
                onClick={() => handleSearch()} // Replace with your actual search function
              >
                Search
              </button>
            </div>
          </div>
          <div className="w-full sm:w-5/6 lg:w-3/4 xl:w-2/3 mt-4">
            <div className="flex flex-row sm:flex-row justify-between items-between mb-4">
              <div className="flex items-center">
                <HomeFiltersButton handleFilters={handleFilter} />
              </div>

              <div className="hidden md:flex flex-grow justify-center space-x-4">
                <SearchCategoryBar handleCategory={handleCategory} />
              </div>

              <div className="flex items-center">
                <HomeSortButton handleSort={handleSort} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeSearch;
