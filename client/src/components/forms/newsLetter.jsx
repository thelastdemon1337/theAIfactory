import React, { useState, useEffect } from "react";
import { useUserContext } from "../../context/userContext";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { subscribeToNewsletter } from "../../utils/sanity";
import * as Constants from "../../utils/constants";

const NewsLetter = () => {
  const { currentUser } = useUserContext();
  const naviage = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState("");

  function onCloseModal() {
    setOpenModal(false);
    setEmail("");
  }

  useEffect(()=>{
    setTimeout(()=>{
        setOpenModal(true);
    },6000)
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email);
    try {
      await subscribeToNewsletter(email);
      setOpenModal(false);
      Constants.notifySuccess("You have subscribed to newsletter successful");
    } catch (error) {
      Constants.notifyError("An error occured");
      console.log(error)
    }
   
  };

  return (
    <>
      <div className="relative h-32 w-32">
        <div className="absolute bottom-0 right-0 h-16 w-16 text-4xl text-white">
          <div className="flex items-center justify-center">
            <Modal
              show={openModal}
              size="md"
              onClose={onCloseModal}
              popup
              className="absolute bottom-0 right-0 h-16 w-full"
            >
              <Modal.Header />
              <Modal.Body>
                <form>
                  <div className="space-y-6">
                    <h3 className="text-3xl font-extrabold text-cente text-gray-900 dark:text-white">
                      See further. Move faster
                    </h3>
                    <p className="text-center">
                      Join 180,000 professionals getting weekly updates on new
                      and exciting AI tools.
                    </p>
                    <div
                      className="w-full flex flex-1 bg-black rounded-lg hover:bg-gray-900"
                      style={{}}
                    >
                      <TextInput
                        className="w-5/6 rounded-none"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        name="email"
                        required
                      />
                      <button
                        type="submit"
                        class="text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-s rounded-full text-lg px-5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                        onClick={handleSubmit}
                      >
                        Join
                      </button>
                    </div>
                  </div>
                </form>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsLetter;
