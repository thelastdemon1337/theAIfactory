import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import * as Constants from "../utils/constants";
import CheckoutForm from "../components/forms/chekoutForm";
import axios from "axios";
import { useUserContext } from "../context/userContext";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";

const stripePromise = loadStripe(Constants.stripe_public_key);

const Payments = () => {
  const { currentUser, getUserDetails } = useUserContext();
  console.log(currentUser)
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(100);
  const [isEditing, setIsEditing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const profilePicLetter = currentUser?.fullname.charAt(0).toUpperCase() || "Y";

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };
  const [editedUser, setEditedUser] = useState({
    fullname: currentUser?.fullname,
    age: currentUser?.age,
    email: currentUser?.email,
    favouriteTools: currentUser?.favouriteTools,
  });

  const updateUser = async () => {
    try {
      const response = await axios.patch(
        Constants.apiGateway + "/users/",
        {
          id: currentUser?._id,
          email: editedUser?.email,
          fullname: editedUser?.fullname,
          favouriteTools: editedUser?.favouriteTools,
          age: editedUser?.age,
        },
        {
          headers: {
            "ngrok-skip-browser-warning": true,
          },
        }
      );

      const userData = response.data[0];
      Constants.notifySuccess("Details Updated");
      console.log("User updated on both frontend and backend:", userData);
    } catch (error) {
      if (error.request.status === 409) {
        Constants.notifyError("Email Already Exists");
      }
      console.log("Error updating user:", error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    // Check if the user has not changed any data
    if (
      editedUser.fullname === currentUser?.fullname &&
      editedUser.age === currentUser?.age &&
      editedUser.email === currentUser?.email &&
      JSON.stringify(editedUser.favouriteTools) ===
        JSON.stringify(currentUser?.favouriteTools)
    ) {
      setIsEditing(false);
      return;
    }
    console.log(editedUser);
    await updateUser();
    await getUserDetails(currentUser?.email, currentUser?.accessToken);
    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // await getUserDetails(currentUser.email, currentUser.accessToken);
    console.log(currentUser);
    try {
      const response = await axios.post(
        Constants.apiGateway + "/payments/create-checkout-session",
        {
          amount: amount,
          userID: currentUser?._id,
        },
        Constants.config
      );
      if (response.status === 200) {
        setClientSecret(response.data.clientSecret);
      } else {
        Constants.notifyError("Error creating checkout session");
      }
    } catch (error) {
      Constants.notifyError("Error");
      console.log(error.message);
    }
  };

  const handleNewsLetterSubmit = async (e) => {
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
      setEmail("");
    } catch (error) {
      Constants.notifyError("An error occured");
      console.log(error);
    }
  };
  return (
    <div>
      {!clientSecret && (
        <>
        
          <main className="profile-page">
            <section className="relative block h-500-px">
              <div
                className="absolute top-0 w-full h-full bg-center bg-cover"
                style={{
                  backgroundImage:
                    'url("https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80")',
                }}
              >
                <span
                  id="blackOverlay"
                  className="w-full h-full absolute opacity-50 bg-black"
                ></span>
              </div>
              <div
                className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
                style={{ transform: "translateZ(0px)" }}
              >
                <svg
                  className="absolute bottom-0 overflow-hidden"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  version="1.1"
                  viewBox="0 0 2560 100"
                  x="0"
                  y="0"
                >
                  <polygon
                    className="text-blueGray-200 fill-current"
                    points="2560 0 2560 100 0 100"
                  ></polygon>
                </svg>
              </div>
            </section>
            <section className="relative py-16 bg-blueGray-200">
              <div className="mx-auto px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                  <div className="px-6">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                        <div className="relative">
                          <img
                            alt="..."
                            src={`https://ui-avatars.com/api/?size=256&name=${profilePicLetter}&background=000&color=fff`}
                            className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-left">
                        <div className="py-6 ml-32 px-3 mt-32 sm:mt-0 flex items-center">
                          <input
                            type="number"
                            id="currency-input"
                            className="block p-2.5 m-1 w-2/3 z-20 ps-10 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                            placeholder="Enter amount"
                            required
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                          />
                          <button
                            onClick={handleSubmit}
                            className="bg-red-500 active:bg-red-700 m-1 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                            type="button"
                          >
                            Add Tokens
                          </button>
                        </div>
                      </div>

                      <div className="w-full lg:w-4/12 px-4 lg:order-1">
                        <div className="flex justify-center py-4 lg:pt-4 pt-8">
                          <div className="mr-4 p-3 text-center">
                            <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                              {currentUser.age}
                            </span>
                            <span className="text-sm text-blueGray-400">
                              Age
                            </span>
                          </div>
                          <div className="mr-4 p-3 text-center">
                            <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                              {currentUser.tokens}
                            </span>
                            <span className="text-sm text-blueGray-400">
                              Tokens
                            </span>
                          </div>
                          <div className="lg:mr-4 p-3 text-center">
                            <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                              {currentUser?.favouriteTools.length}
                            </span>
                            <span className="text-sm text-blueGray-400">
                              FavouriteTools
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center mt-12">
                      <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-2">
                        {currentUser.fullname}
                      </h3>
                      <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold">
                        <i className="fas fa-envelope mr-2 text-lg text-blueGray-400"></i>
                        {currentUser.email}
                      </div>
                    </div>
                    <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                      <div className="flex flex-wrap justify-center">
                        <div className="w-full lg:w-9/12 px-4">
                          <form>
                            <div className="space-y-6">
                              <h3 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white">
                                See further. Move faster
                              </h3>
                              <p className="text-center">
                                Join 180,000 professionals getting weekly
                                updates on new and exciting AI tools.
                              </p>
                              <div className="w-1/2 flex flex-1 bg-black rounded-lg hover:bg-gray-900 justify-center items-center mx-auto">
                                <TextInput
                                  className="w-11/12 rounded-none"
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
                                  onClick={handleNewsLetterSubmit}
                                >
                                  Join
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </>
      )}
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <div className="">
            <CheckoutForm clientSecret={clientSecret} amount={amount} />
          </div>
        </Elements>
      )}
    </div>
  );
};

export default Payments;
