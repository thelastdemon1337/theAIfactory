import React, { useState } from "react";

const HomeFilter = ({handleFilters}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleCheckboxChange = (filter) => {
    setSelectedFilters((prevFilters) => {
      // Toggle the filter selection
      const updatedFilters = prevFilters.includes(filter)
        ? prevFilters.filter((f) => f !== filter)
        : [...prevFilters, filter];

      // Log the selected filters
      console.log(updatedFilters);

      return updatedFilters;
    });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    console.log(selectedFilters);
    handleFilters(selectedFilters)
    toggleModal();
  };
  return (
    <div className="flex justify-center my-3">
      <button
        className="block bg-[#24292F] hover:bg-[#24292F]/90 text-white  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-lg px-12 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        type="button"
        data-modal-target="defaultModal"
        onClick={toggleModal}
        data-modal-toggle="defaultModal"
      >
        Filter
      </button>

      {/* Main modal */}
      {isModalOpen && (
        <form
          onSubmit={handlesubmit}
          method="get"
          id="defaultModal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 z-50 overflow-x-hidden overflow-y-auto w-full p-4 md:inset-0 h-modal md:h-full"
        >
          <div className="fixed inset-0 flex items-center justify-center ">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
              <div className="flex items-start justify-between px-6 py-4 rounded-t">
                <h3 className="text-lg font-normal text-gray-500 dark:text-gray-400">
                  Filter by category
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="defaultModal"
                  onClick={toggleModal}
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="grid grid-cols-2 gap-1 px-4 md:px-6 md:grid-cols-1">
                <ul
                  className="space-y-2 text-sm"
                  aria-labelledby="dropdownDefault"
                >
                  <div className="flex flex-row ">
                    <div className="m-3">
                      <li className="flex items-center">
                        <input
                          id="all"
                          type="checkbox"
                          checked={selectedFilters.includes("all")}
                          value=""
                          onChange={() => handleCheckboxChange("all")}
                          className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />

                        <label
                          for="all"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                        >
                          all
                        </label>
                      </li>

                      <li className="flex items-center">
                        <input
                          id="categories"
                          type="checkbox"
                          value=""
                          checked={selectedFilters.includes("categories")}
                          onChange={() => handleCheckboxChange("categories")}
                          className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />

                        <label
                          for="categories"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                        >
                          categories
                        </label>
                      </li>

                      <li className="flex items-center">
                        <input
                          id="title"
                          type="checkbox"
                          value=""
                          checked={selectedFilters.includes("title")}
                          onChange={() => handleCheckboxChange("title")}
                          className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />

                        <label
                          for="title"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                        >
                          title
                        </label>
                      </li>

                      <li className="flex items-center">
                        <input
                          id="reviews"
                          type="checkbox"
                          value=""
                          checked={selectedFilters.includes("reviews")}
                          onChange={() => handleCheckboxChange("reviews")}
                          className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />

                        <label
                          for="reviews"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                        >
                          reviews
                        </label>
                      </li>
                    </div>
                  </div>
                </ul>
              </div>
              <div className="flex items-center p-6 space-x-4 rounded-b dark:border-gray-600">
                <button
                  type="submit"
                  className="py-2.5 px-5 text-sm font-medium text-white focus:outline-none bg-[#24292F] hover:bg-[#24292F]/90 rounded-lg border border-gray-200  hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Apply
                </button>
                {/* <button
                  type="button"
                  className="py-2.5 px-5 text-sm font-medium text-white focus:outline-none bg-gray-600 rounded-lg border border-gray-200 hover:bg-gray-400 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Reset
                </button> */}
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default HomeFilter;
