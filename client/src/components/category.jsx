import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import CategoryCard from "../components/cards/categoryCard";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";
import { useUserContext } from "../context/userContext";
import * as Constants from "../utils/constants";
import ShopAIPowered from "../components/banners/shopAIPowered";

const callsToAction = [
  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact sales", href: "#", icon: PhoneIcon },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Category = ({
  data,
  handleProductsData,
  handleShowNesletter,
  showNesletter,
  showGlobalTools,
  handleShowGlobalTools,
  showAllCategories,
  handleShowAllCategories,
}) => {
  const { currentUser, updateUser } = useUserContext();
  const [productData, setProductData] = useState(data);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedNavOption, setSelectedNavOption] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const handleNavOptionClick = (option) => {
    // if (option !== "Newsletter") {
    //   handleShowNesletter(false);
    // }
    if (selectedNavOption === option) {
      handleShowAllCategories(false);
      handleShowGlobalTools(false);
      setSelectedNavOption(null);
      return;
    }
    if (option === "Categories") {
      console.log(showCategories);
      handleShowAllCategories(!showAllCategories);
      handleShowGlobalTools(false);
      return;
    }
    handleShowGlobalTools(!showGlobalTools);
    setSelectedNavOption(option);
  };

  const handleFavouriteClick = () => {
    if (selectedNavOption === "Favourite") {
      handleProductsData(productData)
      console.log("Favourite")
      return;
    }
    if (currentUser) {
      setSelectedCategory(null);
      const favoriteTools = data.filter((tool) =>
        currentUser?.favouriteTools.includes(tool._id)
      );
      handleProductsData(favoriteTools);
    }
  };

  const handleNewsletterClick = () => {
    handleShowNesletter(!showNesletter);
  };

  const handleToolsClick = () => {
    navigate("/ai-tools");
  };

  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
      return;
    }
    setSelectedCategory(category);
    // const filteredData = filterByCategory(data, category);
    // handleProductsData(filteredData);
    navigate(`/ai-tools?category=${encodeURIComponent(category)}`);
  };

  useEffect(() => {
    const fetchUniqueCategories = async () => {
      try {
        const uniqueCategories = Array.from(
          new Set(
            productData
              .map((product) => product.category)
              .filter((category) => category !== undefined && category !== null)
          )
        );
        console.log(uniqueCategories);
        setCategories(uniqueCategories);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUniqueCategories();
  }, []);

  return (
    <header className="bg-black">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="black"
              color="white"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5"
              />
            </svg>
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <button
            onClick={() => {
              handleNavOptionClick("Tools");
              setShowCategories(false);
              handleToolsClick();
            }}
            className={`rounded-md px-3 py-2 m-3 text-sm font-medium leading-6 ${
              selectedNavOption === "Tools"
                ? "text-gray-700 bg-gray-200"
                : " text-white  bg-red-700"
            } hover:bg-gray-700 hover:text-white`}
          >
            Tools
          </button>
          <button
            onClick={() => {
              setShowCategories(!showCategories);
              handleNavOptionClick("Categories");
              // handleCategoryClick([]);
            }}
            className={`rounded-md px-3 py-2 m-3 text-sm font-medium leading-6 ${
              selectedNavOption === "Categories"
                ? "text-gray-700 bg-gray-200"
                : " text-white  bg-red-700"
            } hover:bg-gray-700 hover:text-white`}
          >
            Categories
          </button>
          {/* <Popover className="relative rounded-md px-3 py-2 text-sm font-medium leading-6 text-white hover:bg-red-700 hover:text-white r">
            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-white">
            Categories

              <ChevronDownIcon
                className="h-5 w-5 flex-none text-gray-400"
                aria-hidden="true"
              />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-black shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {products.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-red-700"
                    >
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-red-700 group-hover:bg-white">
                        <item.icon
                          className="h-6 w-6 text-white group-hover:text-indigo-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="flex-auto">
                        <a
                          href={item.href}
                          className="block font-semibold text-white"
                        >
                          {item.name}
                          <span className="absolute inset-0" />
                        </a>
                        <p className="mt-1 text-white">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover> */}

          <button
            onClick={() => {
              handleNavOptionClick("Favourite");
              setShowCategories(false);
              handleFavouriteClick();
            }}
            className={`rounded-md px-3 py-2 m-3 text-sm font-medium leading-6 ${
              selectedNavOption === "Favourite"
                ? "text-gray-700 bg-gray-200"
                : " text-white  bg-red-700"
            } hover:bg-gray-700 hover:text-white`}
          >
            Favourite
          </button>
          <button
            onClick={() => {
              handleNavOptionClick("Newsletter");
              setShowCategories(false);
              handleNewsletterClick();
            }}
            className={`rounded-md px-3 py-2 m-3 text-sm font-medium leading-6 ${
              selectedNavOption === "Newsletter"
                ? "text-gray-700 bg-gray-200"
                : " text-white  bg-red-700"
            } hover:bg-gray-700 hover:text-white`}
          >
            Newsletter
          </button>
        </Popover.Group>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="black"
                color="white"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5"
                />
              </svg>
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {/* <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-white hover:bg-red-700">
                        News
                        <ChevronDownIcon
                          className={classNames(
                            open ? "rotate-180" : "",
                            "h-5 w-5 flex-none"
                          )}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {[...products, ...callsToAction].map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-white hover:bg-red-500"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure> */}
                <span
                  onClick={() => {
                    handleNavOptionClick("Tools");
                    setShowCategories(false);
                    handleToolsClick();
                  }}
                >
                  <span className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-red-700">
                    Tools
                  </span>
                </span>
                <span
                  onClick={() => {
                    setShowCategories(!showCategories);
                    handleNavOptionClick("Categories");
                    // handleCategoryClick([]);
                  }}
                >
                  <span
                    href="/discover"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-red-700"
                  >
                    Categories
                  </span>
                </span>
                <span
                  onClick={() => {
                    handleNavOptionClick("Favourite");
                    setShowCategories(false);
                    handleFavouriteClick();
                  }}
                >
                  <span
                    href="/discover"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-red-700"
                  >
                    Favourite
                  </span>
                </span>
                <span
                  onClick={() => {
                    handleNavOptionClick("Newsletter");
                    setShowCategories(false);
                    handleNewsletterClick();
                  }}
                >
                  <span className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-red-700">
                    Newsletter
                  </span>
                </span>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>

      <ShopAIPowered />
      {!showNesletter && !showGlobalTools && !showAllCategories && (
        <div>
          <div className="mx-auto my-4 px-3 flex  items-start justify-start lg:px-8">
            <h3 className="text-xl font-semibold text-white">
              Trending Categories
            </h3>
          </div>
          <div className="mx-auto flex flex-wrap items-start justify-start lg:px-8">
            {categories?.slice(0, 6).map((item, index) => (
              <div
                key={index}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-2"
              >
                <div onClick={() => handleCategoryClick(item)}>
                  <CategoryCard
                    category={item}
                    imageUrl={
                      "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {showAllCategories && (
        <div>
          <div className="mx-auto my-4 flex px-3 items-start justify-start lg:px-8">
            <h3 className="text-xl font-semibold text-white">All Categories</h3>
          </div>
          <div className="mx-auto flex flex-wrap items-start justify-start lg:px-8">
            {categories?.map((item, index) => (
              <div
                key={index}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-2"
              >
                {/* <button
                onClick={() => handleCategoryClick(item)}
                className={`rounded-md px-3 py-2 m-3 text-sm font-medium ${
                  selectedCategory === item
                    ? "text-white bg-red-700"
                    : "text-gray-700 bg-gray-200"
                } hover:bg-gray-700 hover:text-white`}
              >
                {item}
              </button> */}
                <div onClick={() => handleCategoryClick(item)}>
                  <CategoryCard
                    category={item}
                    imageUrl={
                      "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Category;
