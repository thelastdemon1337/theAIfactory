import React from "react";

const CategoryCard = ({ category, imageUrl }) => {
  return (
    <div className="relative bg-yellow-500 text-white p-6 md:p-12 m-4 text-center rounded-md">
      <div className="absolute inset-0 z-0">
        <img
          src={imageUrl}
          alt="Background"
          className="w-full h-full object-cover opacity-30 rounded-md"
        />
      </div>
      <div className="absolute inset-0 bg-black opacity-30 rounded-md"></div>
      <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-black z-10 relative">
        {category}
      </h2>
    </div>
  );
};

export default CategoryCard;
