import React, { useEffect, useState } from "react";
import AIToolsCard from "./cards/aiToolsCard";
import { CiStar } from "react-icons/ci";
import { getAitools } from "../utils/sanity";

const PopularPost = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAitools();
        if (response.length > 0) {
          setData(response);
        }
        console.log(response);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="flex items-center justify-center h-screen mt-32 realtive">
        <div className="w-4/5 flex flex-col justify-center items-start">
          <div className="flex flex-row items-center  rounded-lg px-3 hover:bg-red-700 hover:text-white">
            <CiStar className="text-white text-3xl" />

            <a href="/" className="text-white text-xl my-4 font-medium ">
              Popular
            </a>
          </div>

          <hr className="bg-gray-700 w-full"></hr>
          <br></br>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <AIToolsCard data={data} query={""}  />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PopularPost;
