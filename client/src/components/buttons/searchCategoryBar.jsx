import React, { useState } from "react";

const SearchCategoryBar = ({ handleCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    "Marketing",
    "Productivity",
    "Design",
    "Coding",
    "Video",
    "Research & Analysis",
    "All Categories",
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    handleCategory(category);
  };
  return (
    <>
      <div className="flex space-x-2 bg-transparent rounded-md">
        {categories.map((category, index) => (
          <div
            key={index}
            onClick={() => handleCategoryClick(category)}
            className={`px-4 my-3 ${
              selectedCategory === category
                ? "bg-red-500 text-white"
                : "bg-[#24292F] text-white"
            } rounded-3xl cursor-pointer py-3`}
          >
            {category}
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchCategoryBar;
