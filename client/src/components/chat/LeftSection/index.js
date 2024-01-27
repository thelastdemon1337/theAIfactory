import React, { useState, useEffect } from "react";
import ScrollableFeed from "react-scrollable-feed";
import { useNavigate } from "react-router-dom";

import {
  DiscordIcon,
  ExternalLinkIcon,
  LogOutIcon,
  PlusIcon,
  SunIcon,
  UserIcon,
} from "../../../utils/constants/index";
import axios from "axios";

import * as Constants from "../../../utils/constants";
import { useUserContext } from "../../../context/userContext";

const LeftSection = ({
  show = false,
  handleShowsDefaultMessage,
  showDefaultMessage,
  handleConversation,
  conversation,
}) => {
  const { currentUser } = useUserContext();
  const [newConversations, setNewConversations] = useState([]);
  const naviage = useNavigate();

  useEffect(() => {
    getNewConversation();
  }, []);

  const getNewConversation = async () => {
    try {
      const res = await axios.get(
        Constants.apiGateway + "/chatGPT/conversation/?userID=" + currentUser?._id,
        {
          headers: {
            "ngrok-skip-browser-warning": true,
          },
        }
      );
      if (res.status === 200) {
        console.log(res);
        setNewConversations(res.data.conversations);
      } else {
        // handle error
      }
    } catch (error) {
      // handle error
      console.error(error);
    }
  };

  const handlePrevConversation = (value) => {
    handleConversation(value);
    handleShowsDefaultMessage(false);
  };

  const handleNewConversation = () => {
    handleConversation([]);
    handleShowsDefaultMessage(true);
  };

  return (
    <div
      className={`${show && " flex flex-col"} ${
        !show && "hidden"
      } bg-red-700 md:relative jus md:inset-y-0 md:flex md:w-[260px] md:flex-col my-3 rounded-md`}
    >
      <div className="flex h-full min-h-0 flex-col overflow-hidden ">
        <div className="scrollbar-trigger flex h-full w-full flex-1 items-start">
          <nav className="flex h-full flex-1 flex-col space-y-1 p-2">
            <button
              onClick={handleNewConversation}
              className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm mb-2 flex-shrink-0"
            >
              <PlusIcon />
              New chat
            </button>
            <div className="flex-col flex-1 overflow-y-scroll border-b border-white/20 custom-scrollbar ">
              <div className="flex flex-col gap-2 text-gray-100 text-sm">
                {newConversations?.slice(0, 20).map((conversation) => (
                  <div key={conversation._id} className="conversation-item">
                    <button
                      onClick={() =>
                        handlePrevConversation(conversation.messages)
                      }
                      className="pb-1"
                    >
                      <p>{conversation.conversationName}</p>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {[{ icon: <UserIcon />, text: "Profile" }].map((item, index) => (
              <button
                className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm"
                key={index}
                onClick={() => naviage("/profile")}
              >
                {item.icon}
                {item.text}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default LeftSection;
