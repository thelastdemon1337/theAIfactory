import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ShopAIPowered from "../components/banners/shopAIPowered";

import AIToolsCard from "../components/cards/aiToolsCard";
import { getAitools } from "../utils/sanity";
import { useParams } from "react-router-dom";

const Tools = () => {

    const [productData, setProductData] = useState([]);
    const [globalData, setGlobalData] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const categoryQuery = searchParams.get("category");
    const query = searchParams.get("query");
  
    const filterByCategory = (data, category) => {
      if (!category) {
        return data;
      }
      const filteredData = data.filter((item) => item.category === category);
      return filteredData;
    };
  
    useEffect(() => {
      const fetchTool = async () => {
        try {
          const response = await getAitools();
          if (response.length > 0) {
            if (!categoryQuery) {
              const filteredData = filterByCategory(response, "aitools");
              setProductData(response);
            } else {
              setProductData(response);
            }
  
            setGlobalData(response);
          }
          setLoading(false);
          console.log(response);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      };
  
      fetchTool();
    }, []);
  
  return (
    <div>
      <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <ShopAIPowered />
          <AIToolsCard
            data={productData}
            query={query}
            categoryQuery={categoryQuery}
            showGlobalTools={true}
            handleShowGlobalTools={null}
            showAllCategories={null}
            handleShowAllCategories={null}
          />
        </div>
      )}
    </div>
      
    </div>
  )
}

export default Tools
