import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import * as Constants from "../utils/constants";
import CheckoutForm from "../components/forms/chekoutForm";
import axios from "axios";
import { useUserContext } from "../context/userContext";

const stripePromise = loadStripe(Constants.stripe_public_key);

const Payments = () => {
  const { currentUser, getUserDetails } = useUserContext();
  const [amount, setAmount] = useState(100);
  const [isEditing, setIsEditing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
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
    console.log(editedUser);
    await updateUser();
    await getUserDetails(currentUser?.email, currentUser?.accessToken);
    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // await getUserDetails(currentUser.email, currentUser.accessToken);
    console.log(currentUser)
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

  return (
    <div>
      {!clientSecret && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
                            {/* {amount && (
                        <div className="">
                          <p className="text-gray-500">Amount: {amount}</p>
                        </div>
                      )} */}
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
          </div>
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
