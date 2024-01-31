import React, { useState } from "react";
import { PlaneIcon } from "../../../utils/constants/index";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import * as Constants from "../../../utils/constants";
import { useUserContext } from "../../../context/userContext";

const Footer = ({
  handleShowsDefaultMessage,
  showDefaultMessage,
  handleMessages,
  handleLoading,
  isLoading,
}) => {
  const { currentUser } = useUserContext();
  const naviage = useNavigate();
  const [prompt, setPrompt] = useState("");
  const location = useLocation();
  const tokensQuery = location.state && location.state.tokens;
  console.log(tokensQuery);

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleShowsDefaultMessage(false);
    handleLoading(true);
    setPrompt("");
    console.log(prompt);
    try {
      handleMessages(prompt, "user");
      const res = await axios.post(
        Constants.apiGateway + "/chatGPT",
        {
          prompt: prompt,
          tokens: tokensQuery,
          userID: currentUser?._id,
        },
        Constants.config
      );
      if (res.status === 200) {
        handleMessages(res.data.reply, "bot");
      } else {
        //handle error
      }
      Constants.notifyInfo(res);
      setPrompt("");
    } catch (error) {
      console.log(error.response);
      if (error.response.data.message === "Unsufficient tokens") {
        Constants.notifyError("Unsufficient tokens");
        setTimeout(() => naviage("/profile"), 2000);
      }
      console.log(error);
    }
    handleLoading(false);
  };

  return (
    <div className="relative bg-black mt-[-120px]">
      <form
        onSubmit={handleSubmit}
        className=" flex flex-row gap-3 pt-2 last:mb-2 md:last:mb-6 lg:mx-auto lg:max-w-3xl lg:pt-6 "
      >
        <div className="relative flex h-full flex-1 md:flex-col">
          {isLoading ? (
            <>
              <div className="flex flex-col w-full pl-3 flex-grow md:py-3 md:pl-4 bg-red-700 relative border border-black/10 text-white  dark:border-gray-900/50 dark:text-white rounded-md">
                <textarea
                  tabIndex="0"
                  rows="1"
                  placeholder="Loading..."
                  onChange={(e) => setPrompt(e.target.value)}
                  value={prompt}
                  disabled
                  className="m-0 w-full bg-red-700 resize-none border-0 p-0 pr-7 focus:ring-0 focus-visible:ring-0 placeholder-white dark:bg-red-700 outline-none overflow-y-hidden h-[23px]"
                ></textarea>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled
                  className="absolute rounded-md bg-gray-500 p-1 text-gray-400 bottom-1.5 right-1 md:bottom-2.5 md:right-2 hover:bg-red-300"
                >
                  <PlaneIcon />
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col w-full pl-3 flex-grow md:py-3 md:pl-4 bg-red-700 relative border border-black/10 text-white  dark:border-gray-900/50 dark:text-white rounded-md">
                <textarea
                  tabIndex="0"
                  rows="1"
                  placeholder="Message ChatGPT ..."
                  onChange={(e) => setPrompt(e.target.value)}
                  value={prompt}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                  className="m-0 w-full bg-red-700 resize-none border-0 p-0 pr-7 focus:ring-0 focus-visible:ring-0 placeholder-white dark:bg-red-700 outline-none overflow-y-hidden h-[23px]"
                ></textarea>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="absolute rounded-md bg-gray-500 p-1 text-gray-400 bottom-1.5 right-1 md:bottom-2.5 md:right-2 hover:bg-red-300"
                >
                  <PlaneIcon />
                </button>
              </div>
            </>
          )}
        </div>
      </form>
      <div className="px-3 pt-2 pb-3 text-center text-xs text-gray-100/50 md:px-4 md:pt-3 md:pb-6">
        <a href="/" target="_blank" className="underline">
          ChatGPT
        </a>
      </div>
    </div>
  );
};

export default Footer;
