import React, { useState } from "react";
import { LeftSection, RightSection } from "./index";
import { MenuIcon, PlusIcon } from "../../utils/constants/index";
import { useUserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  // Toggle
  const { currentUser } = useUserContext();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [showDefaultMessage, setShowsDefaultMessage] = useState(true);

  const handleConversation = (value) => {
    console.log(value);
    setConversation(value);
  };

  const handleShowsDefaultMessage = (value) => {
    setShowsDefaultMessage(value);
  };

  return (
    <div>
      {currentUser._id ? (
        <>
          {" "}
          <div>
            <div className="sticky top-0 z-10 flex items-center border-b border-white/20 bg-gray-800 pl-1 pt-1 text-gray-200 sm:pl-3 md:hidden">
              <button
                type="button"
                className={`-ml-0.5 -mt-0.5 inline-flex h-10 w-10 items-center outline-none justify-center rounded-md focus:ring-1 focus:ring-white ${
                  !show && "!ring-0"
                } dark:hover:text-white text-gray-100`}
                onClick={() => setShow(!show)}
              >
                <span className="sr-only">Open sidebar</span>
                <MenuIcon />
              </button>
              <h1 className="flex-1 text-center text-base font-normal">
                New chat
              </h1>
              <button type="button" className="px-3">
                <PlusIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="flex h-full flex-1 flex-col md:flex-row">
              <LeftSection
                {...{ show }}
                handleShowsDefaultMessage={handleShowsDefaultMessage}
                showDefaultMessage={showDefaultMessage}
                handleConversation={handleConversation}
                conversation={conversation}
                className="w-full md:w-1/5"
              />

              <RightSection
                handleShowsDefaultMessage={handleShowsDefaultMessage}
                showDefaultMessage={showDefaultMessage}
                handleConversation={handleConversation}
                conversation={conversation}
                className="w-full md:w-4/5"
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div class="bg-gray-950 flex flex-col items-center justify-start">
            <div class="bg-gray-950 flex items-center text-gray-300 justify-center flex-grow">
              <div class="p-8 rounded shadow-md text-center">
                <h1 class="text-4xl font-semibold mb-4">Login to Continue</h1>
                <p class="text-gray-300">
                  Please sign in to access the full features.
                </p>
              </div>
            </div>

            <button
              class="bg-gray-500 hover:bg-gray-900 text-white p-3 rounded shadow-md"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Chat;
