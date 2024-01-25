import React from 'react';

const CustomerSupportBanner = () => {
  return (
    <div className="relative h-96 bg-cover bg-center bg-red-400">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          alt="Background"
          className="w-full h-full object-cover opacity-50"
        />
      </div>

      <div className="absolute inset-0 flex flex-col justify-end p-8 text-black">
        <h1 className="text-xl ">Virtual Assistant</h1>
        <p className="text-4xl font-bold">AI Powered Tasks</p>
      </div>
    </div>
  );
};

export default CustomerSupportBanner;
