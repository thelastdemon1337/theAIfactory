import React, { useState } from "react";

const HomeSort = ({handleSort}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleOptionClick = (value) => {
    setSelectedValue(value);
    setIsDropdownOpen(false);
    handleSort(value)
    console.log(value)
  };

  const options = [
    { label: "Categories", value: "categories" },
    { label: "Reviews", value: "reviews" },
    { label: "Favourites", value: "favourites" },
    { label: "By all", value: "all" },
  ];

  return (
    <div className="relative inline-block">
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        onClick={toggleDropdown}
        className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 my-3 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-12 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Sort
        {/* <svg
          className={`w-2.5 h-2.5 ms-3 transition-transform ${
            isDropdownOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg> */}
      </button>

      {isDropdownOpen && (
        <div className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            {options.map((option) => (
              <li key={option.value}>
                <span
                  //   href="/"
                  className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${
                    selectedValue === option.value ? "font-bold" : ""
                  }`}
                  onClick={() => handleOptionClick(option.value)}
                >
                  {option.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HomeSort;
