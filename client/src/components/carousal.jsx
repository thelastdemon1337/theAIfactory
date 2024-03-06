import React, { useEffect } from "react";
import "../styles/carousal.css";
import carousal1 from '../assets/images/carousal1.jpeg';
import carousal2 from '../assets/images/carousal2.jpeg';
import carousal3 from '../assets/images/carousal3.jpeg';

const CarousalHome = () => {
  useEffect(() => {
    const slider = document.querySelector(".slider");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");

    if (slider && prevButton && nextButton) {
      function activatePrev() {
        const items = document.querySelectorAll(".item");
        slider.prepend(items[items.length - 1]);
      }

      function activateNext() {
        const items = document.querySelectorAll(".item");
        slider.append(items[0]);
      }

      prevButton.addEventListener("click", activatePrev);
      nextButton.addEventListener("click", activateNext);

      return () => {
        prevButton.removeEventListener("click", activatePrev);
        nextButton.removeEventListener("click", activateNext);
      };
    }
  }, []);

  const carouselData = [
    {
      title: "Lossless Youths",
      description: "",
      imageUrl:'https://utywebgl.s3.amazonaws.com/public_temporary_images/dummy1.jpeg'
    },
    {
      title: "Lossless Youths",
      description: "",
      imageUrl: 'https://utywebgl.s3.amazonaws.com/public_temporary_images/dummy2.jpeg'
    },
    {
      title: "Lossless Youths",
      description: "",
      imageUrl: 'https://utywebgl.s3.amazonaws.com/public_temporary_images/dummy3.jpeg'
    },
    {
      title: "Lossless Youths",
      description: "",
      imageUrl: 'https://utywebgl.s3.amazonaws.com/public_temporary_images/dummy1.jpeg'
    },
    {
      title: "Lossless Youths",
      description: "",
      imageUrl: 'https://utywebgl.s3.amazonaws.com/public_temporary_images/dummy2.jpeg'
    },
    {
      title: "Lossless Youths",
      description: "",
      imageUrl: 'https://utywebgl.s3.amazonaws.com/public_temporary_images/dummy3.jpeg'
    },
  ];

  return (
    <>
      <main>
        <div className="carousel-container">
          <ul className="slider">
            {carouselData.map((item, index) => (
              <li
                key={index}
                className="item"
                style={{
                  backgroundImage: `url(${item.imageUrl})`
                }}
              >
                <div className="content">
                  <h2 className="title">{item.title}</h2>
                  <p className="description">{item.description}</p>
                  <button>Read More</button>
                </div>
              </li>
            ))}
          </ul>
          <nav className="nav flex items-center w-full">
            <button
              type="button"
              style={{ transform: "rotate(180deg)" }}
              className="prev text-white ml-3 bg-red-700 hover:bg-black focus:ring-4 focus:outline-none focus:ring-black font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-black"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
              <span className="sr-only"></span>
            </button>
            <div className="flex-grow"></div>
            <button
              type="button"
              className="next text-white mr-3 bg-red-700 hover:bg-black focus:ring-4 focus:outline-none focus:ring-black font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-black"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
              <span className="sr-only"></span>
            </button>
          </nav>
        </div>
      </main>
    </>
  );
};

export default CarousalHome;
