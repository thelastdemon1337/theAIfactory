import React, { useState, useEffect } from "react";
import Category from "../components/category";
import NewsCard from "../components/cards/newsCard";
import ShopAIPowered from "../components/banners/shopAIPowered";
import Newsletter from "../components/cards/newsletter";
import AIToolsCard from "../components/cards/aiToolsCard";
import { useLocation } from "react-router-dom";
import { getAitools, getNewsletter } from "../utils/sanity";

const Discover = () => {
  const [productData, setProductData] = useState([]);
  const [newsletterData, setnewNetterData] = useState([]);
  const [showNesletter, setShowNesletter] = useState(false);
  const [showGlobalTools, setShowGlobalTools] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [globalData, setGlobalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");
  const categoryQuery = searchParams.get("category");

  const handleProductsData = (value) => {
    if (value.length === 0) {
      setProductData(globalData);
      return;
    }
    setProductData(value);
  };

  const handleShowNesletter = (value) => {
    setShowNesletter(!showNesletter);
  };

  const handleShowGlobalTools = (value) => {
    setShowGlobalTools(value);
  };

  const handleShowAllCategories = (value) => {
    setShowAllCategories(value);
  };

  useEffect(() => {
    const fetchTool = async () => {
      try {
        const response = await getAitools();
        if (response.length > 0) {
          setProductData(response);
          setGlobalData(response);
        }
        setLoading(false);
        console.log(response);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    const fetchNewsletter = async () => {
      try {
        const response = await getNewsletter();
        if (response.length > 0) {
          setnewNetterData(response);
        }
        setLoading(false);
        console.log(response);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchTool();
    fetchNewsletter();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Category
            data={productData}
            handleProductsData={handleProductsData}
            handleShowNesletter={handleShowNesletter}
            showNesletter={showNesletter}
            showGlobalTools={showGlobalTools}
            handleShowGlobalTools={handleShowGlobalTools}
            showAllCategories={showAllCategories}
            handleShowAllCategories={handleShowAllCategories}
          />
          {!showNesletter && (
            <AIToolsCard
              data={productData}
              query={query}
              categoryQuery={categoryQuery}
              showGlobalTools={showGlobalTools}
              handleShowGlobalTools={handleShowGlobalTools}
              showAllCategories={showAllCategories}
              handleShowAllCategories={handleShowAllCategories}
            />
          )}
          {showNesletter && <Newsletter data={newsletterData} />}
        </>
      )}
    </div>
  );
};

export default Discover;
