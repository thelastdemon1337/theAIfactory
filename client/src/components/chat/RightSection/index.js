import React, { useState, useEffect } from "react";
import ScrollableFeed from "react-scrollable-feed";
import axios from "axios";
import * as Constants from "../../../utils/constants";
import { useUserContext } from "../../../context/userContext";
import { LightningChargeIcon, SunIcon } from "../../../utils/constants/index";
import Footer from "../Footer/index";
import { useNavigate } from "react-router-dom";

const RightSection = ({
  handleShowsDefaultMessage,
  showDefaultMessage,
  handleConversation,
  conversation,
}) => {
  const { currentUser, getUserDetails } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState(conversation ? conversation : []);
  const naviage = useNavigate();

  useEffect(() => {
    if (conversation) {
      setMessages(conversation);
    }
    if (conversation.length === 0) {
      getNewConversation();
    }
    getLatestUserDetails();
  }, [conversation]);

  useEffect(() => {
    getLatestUserDetails();
  }, [messages]);

  const handleLoading = (value) => {
    setIsLoading(value);
  };

  const getLatestUserDetails = async () => {
    try {
      await getUserDetails(currentUser?.email, currentUser?.accessToken);
    } catch (error) {
      // handle error
      console.error(error);
    }
  };

  const getNewConversation = async () => {
    try {
      const res = await axios.get(
        Constants.apiGateway + "/chatGPT",
        {
          params: {
            userID: currentUser?._id,
          },
        },
        Constants.config
      );

      if (res.status === 200) {
        Constants.notifyInfo(res.data);
      } else {
        // handle error
      }
    } catch (error) {
      // handle error
      console.error(error);
    }
  };

  const handleMessages = (messageText, sender) => {
    setMessages((prevMessages) => {
      const newMessage = {
        id: prevMessages.length + 1,
        sender,
        text: messageText,
      };
      return [...prevMessages, newMessage];
    });
  };

  const handleDafaultMessage = async (prompt) => {
    try {
      handleMessages(prompt, "user");
      handleShowsDefaultMessage(false);
      setIsLoading(true);
      console.log(prompt);
      const res = await axios.post(
        Constants.apiGateway + "/chatGPT",
        {
          prompt: prompt,
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
    } catch (error) {
      console.log(error.response);
      if (error.response.data.message === "Unsufficient tokens") {
        Constants.notifyError("Unsufficient tokens");
        setTimeout(() => naviage("/profile"), 2000);
      }
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex h-full flex-1 flex-col ">
      <main className="relative h-full w-full transition-width flex flex-col overflow-hidden items-stretch flex-1">
        <div className="flex-1 overflow-hidden">
          <div className="flex flex-col items-center text-sm h-full md:h-screen bg-lightBlack">
            <div className="text-gray-800 w-full md:max-w-2xl lg:max-w-3xl md:h-full md:flex md:flex-col px-6">
              {showDefaultMessage ? (
                <>
                  <div>
                    <h1 className="text-4xl text-gray-100 font-semibold text-center mt-6 sm:mt-[20vh] ml-auto mr-auto mb-10 sm:mb-16">
                      ChatGPT
                    </h1>
                    <div className="md:flex items-start text-center gap-3.5">
                      {[
                        {
                          icon: <SunIcon />,
                          title: "Examples",
                          subTitle: [
                            "Explain quantum computing in simple terms",
                            "Got any creative ideas for a 10 year old’s birthday?",
                            "How do I make an HTTP request in Javascript?",
                          ],
                          hover: true,
                        },
                        {
                          icon: <LightningChargeIcon />,
                          title: "Capabilities",
                          subTitle: [
                            "Remembers what user said earlier in the conversation",
                            "Allows user to provide follow-up corrections",
                            "Trained to decline inappropriate requests",
                          ],
                          hover: false,
                        },
                      ].map((item, index) => (
                        <div
                          className="flex flex-col mb-8 md:mb-auto gap-3.5 flex-1 "
                          key={index}
                        >
                          <h2 className="flex gap-3 text-gray-100 items-center m-auto text-lg font-normal md:flex-col md:gap-2">
                            {item.icon}
                            {item.title}
                          </h2>
                          <ul className="flex flex-col gap-3.5 w-full sm:max-w-md m-auto">
                            {item.subTitle.map((subTitle, subTitleIndex) => (
                              <button
                                onClick={() => handleDafaultMessage(subTitle)}
                                className={`w-full  bg-red-700 text-gray-100 p-3 rounded-md ${
                                  item.hover
                                    ? "hover:bg-red-900 cursor-pointer"
                                    : "cursor-text"
                                }`}
                                key={subTitleIndex}
                              >
                                {subTitle}
                              </button>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex h-screen bg-black my-3 rounded-md pb-32">
                    <div className="flex-1 flex flex-col overflow-hidden">
                      <div className="flex-1 overflow-y-scroll p-4  custom-scrollbar">
                        <ScrollableFeed>
                          {messages.map((message) => (
                            <div
                              key={message.id}
                              className={`flex ${
                                message.sender === "bot"
                                  ? "justify-start"
                                  : "justify-end"
                              } mb-4`}
                            >
                              <div
                                className={`max-w-md p-4 rounded-lg ${
                                  message.sender === "bot"
                                    ? "bg-red-600 text-white"
                                    : "bg-gray-300"
                                }`}
                              >
                                {message.text}
                              </div>
                            </div>
                          ))}
                        </ScrollableFeed>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="w-full h-48 flex-shrink-0"></div>
          </div>
        </div>
        <div>
          <Footer
            handleShowsDefaultMessage={handleShowsDefaultMessage}
            showDefaultMessage={showDefaultMessage}
            handleMessages={handleMessages}
            handleLoading={handleLoading}
            isLoading={isLoading}
          />
        </div>
      </main>
    </div>
  );
};

export default RightSection;
