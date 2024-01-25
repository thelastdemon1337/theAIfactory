import React from "react";
import CustomerSupportBanner from "../components/banners/customerSupport";
import CustomerSupportCard from "../components/cards/customerSupportCard";

const CustomerSupport = () => {
  const aiToolsData = [
    {
      title: "Speech Recognition",
      imageUrl:
        "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      title: "Image Classification",
      imageUrl:
        "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },

    {
      title: "Speech Recognition",
      imageUrl:
        "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      title: "Image Classification",
      imageUrl:
        "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },

    {
      title: "Speech Recognition",
      imageUrl:
        "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      title: "Image Classification",
      imageUrl:
        "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },

    {
      title: "Speech Recognition",
      imageUrl:
        "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      title: "Image Classification",
      imageUrl:
        "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      title: "Speech Recognition",
      imageUrl:
        "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      title: "Image Classification",
      imageUrl:
        "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      title: "Speech Recognition",
      imageUrl:
        "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      title: "Image Classification",
      imageUrl:
        "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
  ];
  return (
    <>
      {/* <div>

        <div className="w-full md:w-4/5">
          <CustomerSupportBanner />
          <div className="flex flex-wrap justify-center">
            {aiToolsData.map((tool, index) => (
              <div
                key={index}
                className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-4"
              >
                <CustomerSupportCard
                  title={tool.title}
                  imageUrl={tool.imageUrl}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/5"></div>

      </div> */}
      <div className="flex">
      <div className="w-full md:w-1/5">

      </div>

      <div className="w-full md:w-4/5">
      <h1 className="text-4xl font-bold my-5 leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">Customer Support</h1>
        <CustomerSupportBanner />
        <div className="flex flex-wrap justify-center">
          {aiToolsData.map((tool, index) => (
            <div
              key={index}
              className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-4"
            >
              <CustomerSupportCard
                title={tool.title}
                imageUrl={tool.imageUrl}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default CustomerSupport;
