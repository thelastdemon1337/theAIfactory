import React, { useState, useEffect } from "react";
import { useUserContext } from "../../context/userContext";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { subscribeToNewsletter } from "../../utils/sanity";
import * as Constants from "../../utils/constants";

const NewsLetter = () => {
  const { currentUser } = useUserContext();
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState("");
  const [emailExists, setEmailExists] = useState(false);

  function onCloseModal() {
    setOpenModal(false);
    setEmail("");
  }
  const checkEmailExists = async () => {
    try {
      const response = await axios.post(
        `${Constants.apiGateway}/newsletter/check-email-exists`,
        {
          email: currentUser.email,
        },
        Constants.config
      );

      if (response.status === 200) {
        setEmailExists(response.data.exists);
      } else {
        console.log(`Unexpected status code: ${response.status}`);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await checkEmailExists();
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    const hasModalBeenShown = sessionStorage.getItem('modalShown');
    const timeoutId = setTimeout(() => {
     if (!hasModalBeenShown && !emailExists) {
      sessionStorage.setItem('modalShown', 'true');
      setOpenModal(true);
    }
    }, 6000);

    return () => clearTimeout(timeoutId);

  }, [currentUser?.email, emailExists]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email);
    try {
      const response = await axios.post(
        Constants.apiGateway + "/newsletter",
        {
          email: email,
        },
        Constants.config
      );
      // await subscribeToNewsletter(email);
      if (response.status === 200) {
        Constants.notifySuccess(
          "You have subscribed to our newsletter successful"
        );
      }
      setOpenModal(false);
    } catch (error) {
      Constants.notifyError("An error occured");
      console.log(error);
    }
  };

  return (
    <>
      <div className="lg:fixed lg:bottom-0 lg:right-0 sm:mx-4 sm:my-4 md:mx-8 md:my-8 lg:mx-16 lg:my-16">
        <div className="text-4xl text-white">
          <div className="flex items-center justify-center">
            <Modal
              show={openModal}
              size="md"
              onClose={onCloseModal}
              popup
              className="bottom-0 right-0 h-16 w-full"
              style={{
                position: "fixed",
                bottom: "0",
                right: "0",
              }}
            >
              <Modal.Header />
              <Modal.Body>
                <form>
                  <div className="space-y-6">
                    <h3 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white">
                      See further. Move faster
                    </h3>
                    <p className="text-center">
                      Join 180,000 professionals getting weekly updates on new
                      and exciting AI tools.
                    </p>
                    <div className="w-full flex flex-1 bg-black rounded-lg hover:bg-gray-900">
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
                        className="text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-s rounded-full text-lg px-5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
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
