import React, { useEffect } from "react";
import AgeInputForm from "../components/forms/AgeInputForm";
import { useUserContext } from "../context/userContext";
import PopularPost from "../components/popularPost";
import CarousalHome from "../components/carousal";
import HomeSearch from "../components/homeSearch";

const Home = () => {
  const { isAgeProvided, getUserDetails, currentUser} = useUserContext();
  const googleLoggedIn = localStorage.getItem("googleLoggedIn");

  // console.log(currentUser)
  // useEffect(() => {
  //   getUserDetails(currentUser.email, currentUser.accessToken);
  // }, []);

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
