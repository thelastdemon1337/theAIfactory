import React from 'react';

const Banner = () => {
  return (
    <div className="relative bg-yellow-500 text-white p-4 md:p-8 text-center">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          alt="Background"
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      <div className="relative z-10">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-black">Shop AI-Powered</h1>
      </div>
    </div>
  );
};

export default Banner;
