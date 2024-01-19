import React, { useState } from "react";

const HomeFilter = ({ handleFilters }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (value) => {
    console.log(value)
    setSelectedValue(value);
    setIsDropdownOpen(false);
    handleFilters(value)
    console.log(value);
  };



  const handlesubmit = (e) => {
    e.preventDefault();
    console.log(selectedFilters);
    handleFilters(selectedFilters);
  };

  const options = [
    { label: "Categories", value: "categories" },
    { label: "Reviews", value: "reviews" },
    { label: "Title", value: "favourites" },
    { label: "All", value: "all" },
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
        Filter
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

export default HomeFilter;
