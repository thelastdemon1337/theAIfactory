import React from "react";

const CustomerSupportCard = ({ title, imageUrl }) => {
  return (
    <div className="relative bg-yellow-500 text-black p-4 md:p-8 m-3 text-center rounded-sm">
      <span className="block max-w-sm p-6 rounded-lg">
        <div className="absolute inset-0 z-0">
          <img
            src={imageUrl}
            alt="Background"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <h5 className="mb-2 text-3xl font-bold tracking-tigh">
          {title}
        </h5>
      </span>
    </div>
  );
};

export default CustomerSupportCard;
