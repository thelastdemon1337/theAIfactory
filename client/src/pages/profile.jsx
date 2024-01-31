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
          {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-3 bg-black p-6 shadow-sm rounded-sm">
              <div className="bg-white p-6 md:p-10 shadow-sm rounded-xl">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-4 md:space-y-0 md:space-x-4 font-semibold text-gray-900 leading-8">
                  <div className="flex items-center space-x-4">
                    <span className="text-red-500">
                      <svg
                        className="h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </span>
                    <span className="tracking-wide text-xl font-bold">
                      About
                    </span>
                  </div>

                  <div className="ml-auto">
                    {isEditing ? (
                      <button
                        onClick={handleSaveClick}
                        type="button"
                        className="bg-red-700 text-white px-4 py-2 rounded-md"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleEditClick}
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </div>
                <div className="text-gray-700 mt-4">
                  <div className="flex flex-col md:flex-row text-lg gap-4">
                    <div className="flex flex-col md:flex-row items-start">
                      <div className="px-4 py-2 font-semibold">First Name</div>
                      {isEditing ? (
                        <input
                          type="text"
                          className="px-2 py-2 border rounded-md"
                          value={editedUser.fullname}
                          onChange={(e) =>
                            setEditedUser({
                              ...editedUser,
                              fullname: e.target.value,
                            })
                          }
                        />
                      ) : (
                        <div className="px-2 py-2">{currentUser?.fullname}</div>
                      )}
                    </div>
                    <div className="flex flex-col md:flex-row items-start">
                      <div className="px-4 py-2 font-semibold">Age</div>
                      {isEditing ? (
                        <input
                          type="number"
                          className="px-4 py-2 border rounded-md"
                          value={editedUser.age}
                          onChange={(e) =>
                            setEditedUser({
                              ...editedUser,
                              age: e.target.value,
                            })
                          }
                        />
                      ) : (
                        <div className="px-4 py-2">{currentUser?.age}</div>
                      )}
                    </div>
                    <div className="flex flex-col md:flex-row items-start">
                      <div className="px-4 py-2 font-semibold">Email</div>
                      {isEditing ? (
                        <input
                          type="email"
                          className="px-4 py-2 border rounded-md"
                          value={editedUser.email}
                          disabled
                          onChange={(e) =>
                            setEditedUser({
                              ...editedUser,
                              email: e.target.value,
                            })
                          }
                        />
                      ) : (
                        <div className="px-4 py-2">{currentUser?.email}</div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-gray-700 mt-4">
                  <div className="flex flex-col md:flex-row text-lg gap-4">
                    <div className="flex flex-col md:flex-row items-start">
                      <div className="px-4 py-2 font-semibold">
                        Available Tokens
                      </div>
                      <div className="px-4 py-2 font-semibold">
                        {currentUser?.tokens}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-1 relative my-5 mx-auto shadow-xl w-full rounded-2xl">
              <div className="relative flex flex-col justify-center overflow-hidden bg-black">
                <div className="relative bg-white px-6 py-10 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                  <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                    <div className="flex flex-col items-center justify-center text-center space-y-2">
                      <div className="font-semibold text-3xl">
                        <p>Add Tokens</p>
                      </div>

                      <form className="max-w-[18rem] mx-auto flex"></form>

                      <form onSubmit={handleSubmit}>
                        <div className="flex flex-col ">
                          <div className="flex flex-row items-center justify-center mx-auto w-full max-w-xs">
 {amount && (
                        <div className="">
                          <p className="text-gray-500">Amount: {amount}</p>
                        </div>
                      )} 
                            <div className="w-64 h-16 ">
                              <div className="relative w-full">
                                <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                                  <svg
                                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 16"
                                  >
                                    <path
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M5 2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1M2 5h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm8 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
                                    />
                                  </svg>
                                </div>
                                <input
                                  type="number"
                                  id="currency-input"
                                  className="block p-2.5 w-full z-20 ps-10 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700   dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                                  placeholder="Enter amount"
                                  required
                                  value={amount}
                                  onChange={(e) => setAmount(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col space-y-5">
                            <div>
                              <button
                                type="submit"
                                className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-red-700 border-none text-white text-sm shadow-sm"
                              >
                                ADD
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div> */}
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
