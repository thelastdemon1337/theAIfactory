import React, { useState } from "react";

const ModalExample = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
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
          action="#"
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
                          id="apple"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />

                        <label
                          for="apple"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                        >
                          Apple (56)
                        </label>
                      </li>

                      <li className="flex items-center">
                        <input
                          id="fitbit"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />

                        <label
                          for="fitbit"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                        >
                          Fitbit (56)
                        </label>
                      </li>

                      <li className="flex items-center">
                        <input
                          id="dell"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />

                        <label
                          for="dell"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                        >
                          Dell (56)
                        </label>
                      </li>

                      <li className="flex items-center">
                        <input
                          id="asus"
                          type="checkbox"
                          value=""
                          checked
                          className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />

                        <label
                          for="asus"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                        >
                          Asus (97)
                        </label>
                      </li>

                      <li className="flex items-center">
                        <input
                          id="logitech"
                          type="checkbox"
                          value=""
                          checked
                          className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />

                        <label
                          for="logitech"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                        >
                          Logitech (97)
                        </label>
                      </li>

                      <li className="flex items-center">
                        <input
                          id="msi"
                          type="checkbox"
                          value=""
                          checked
                          className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />

                        <label
                          for="msi"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                        >
                          MSI (97)
                        </label>
                      </li>
                    </div>
                    <div className="m-3">
                      <li className="flex items-center">
                        <input
                          id="bosch"
                          type="checkbox"
                          value=""
                          checked
                          className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />

                        <label
                          for="bosch"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                        >
                          Bosch (176)
                        </label>
                      </li>

                      <li className="flex items-center">
                        <input
                          id="sony"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />

                        <label
                          for="sony"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                        >
                          Sony (234)
                        </label>
                      </li>

                      <li className="flex items-center">
                        <input
                          id="samsung"
                          type="checkbox"
                          value=""
                          checked
                          className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />

                        <label
                          for="samsung"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                        >
                          Samsung (76)
                        </label>
                      </li>

                      <li className="flex items-center">
                        <input
                          id="canon"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />

                        <label
                          for="canon"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                        >
                          Canon (49)
                        </label>
                      </li>

                      <li className="flex items-center">
                        <input
                          id="microsoft"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />

                        <label
                          for="microsoft"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                        >
                          Microsoft (45)
                        </label>
                      </li>

                      <li className="flex items-center">
                        <input
                          id="razor"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />

                        <label
                          for="razor"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                        >
                          Razor (49)
                        </label>
                      </li>
                    </div>
                  </div>
                </ul>
              </div>
              <div className="flex items-center p-6 space-x-4 rounded-b dark:border-gray-600">
                <button
                  type="submit"
                  onClick={toggleModal}
                  className="py-2.5 px-5 text-sm font-medium text-white focus:outline-none bg-[#24292F] hover:bg-[#24292F]/90 rounded-lg border border-gray-200  hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Apply
                </button>
                <button
                  type="button"
                  onClick={toggleModal}
                  className="py-2.5 px-5 text-sm font-medium text-white focus:outline-none bg-gray-600 rounded-lg border border-gray-200 hover:bg-gray-400 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default ModalExample;
