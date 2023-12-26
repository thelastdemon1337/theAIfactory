import React from "react";
import AgeInputForm from "../components/forms/AgeInputForm";
import { useUserContext } from "../context/userContext";
import PopularPost from "../components/popularPost";
import CarousalHome from "../components/carousal";
import HomeSearch from "../components/homeSearch";

const Home = () => {
  const { isAgeProvided } = useUserContext();
  const googleLoggedIn = localStorage.getItem("googleLoggedIn");

  if (googleLoggedIn && !isAgeProvided) {
    return <AgeInputForm />;
  }

  return (
    <>
      <CarousalHome />
      <HomeSearch />
      <PopularPost />
    </>
  );
};

export default Home;
