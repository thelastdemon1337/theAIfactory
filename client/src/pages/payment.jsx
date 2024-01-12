// import React, { useState, useEffect } from "react";
// import axios from "axios";

// import * as Constants from "../utils/constants";
// import { useUserContext } from "../context/userContext";

// //stripe
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   EmbeddedCheckoutProvider,
//   EmbeddedCheckout,
//   PaymentElement,
//   useStripe,
//   useElements,
//   Elements,
// } from "@stripe/react-stripe-js";

// const PaymentScreen = () => {
//   const { currentUser, getUserDetails, updateUser } = useUserContext();

//   const stripePromise = loadStripe(Constants.stripe_public_key);
//   const [clientSecret, setClientSecret] = useState("");
//   const [amount, setAmount] = useState("");
//   const [tokens, setTokens] = useState("");
//   const [sessionID, setSessionID] = useState("");
//   const [message, setMessage] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const options = { clientSecret };
//   const stripe = useStripe();

//   useEffect(() => {
//     if (!stripe) {
//       return;
//     }

//     const clientSecret = new URLSearchParams(window.location.search).get(
//       "payment_intent_client_secret"
//     );

//     if (!clientSecret) {
//       return;
//     }

//     stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
//       switch (paymentIntent.status) {
//         case "succeeded":
//           setMessage("Payment succeeded!");
//           break;
//         case "processing":
//           setMessage("Your payment is processing.");
//           break;
//         case "requires_payment_method":
//           setMessage("Your payment was not successful, please try again.");
//           break;
//         default:
//           setMessage("Something went wrong.");
//           break;
//       }
//     });
//   }, [stripe]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         Constants.apiGateway + "/payments/create-checkout-session",
//         {
//           amount: amount,
//           userID: currentUser._id,
//         },
//         Constants.config
//       );
//       if (response.status === 200) {
//         setClientSecret(response.data.clientSecret);
//         setTokens(response.data.tokens);
//         setSessionID(response.data.sessionId);

//         // try {
//         //   const sessionStatusResponse = await axios.get(
//         //     Constants.apiGateway + "/payments/session_status",
//         //     {
//         //       params: {
//         //         clientSecret: response.data.clientSecret,
//         //         sessionId: response.data.sessionId,
//         //       },
//         //     },
//         //     Constants.config
//         //   );
//         //   if (sessionStatusResponse.status === 200) {
//         //     const { status } = sessionStatusResponse.data;

//         //     if (status === "open") {
//         //       Constants.notifySuccess("Session is open");
//         //     } else if (status === "complete") {
//         //       Constants.notifyError("Session is complete");
//         //       try {
//         //         const response = await axios.patch(
//         //           Constants.apiGateway + "/payments/create-checkout-session/",
//         //           {
//         //             id: currentUser._id,
//         //             amount: amount,
//         //             tokens: tokens,
//         //           },
//         //           Constants.config
//         //         );
//         //         return response.data;
//         //       } catch (error) {
//         //         Constants.notifyError("Error updating user tokens");
//         //         console.log(error);
//         //         throw error;
//         //       }
//         //     } else {
//         //       Constants.notifyError("Unexpected session status");
//         //     }
//         //   } else {
//         //     Constants.notifyError("Error checking session status");
//         //   }
//         // } catch (error) {
//         //   console.error("Error checking session status:", error);
//         //   Constants.notifyError("Error checking session status");
//         // }
//       } else {
//         Constants.notifyError("Error creating checkout session");
//       }
//     } catch (error) {
//       Constants.notifyError("Error");
//       console.log(error);
//     }
//   };

//   return (
//     <>

//       <div id="checkout" className="m-4 p-4">
//         {clientSecret && (
//           <Elements options={options} stripe={stripePromise}>
//             <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
//               <EmbeddedCheckout />
//             </EmbeddedCheckoutProvider>
//           </Elements>
//         )}
//       </div>
//     </>
//   );
// };

// export default PaymentScreen;

import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import * as Constants from "../utils/constants";
import CheckoutForm from "../components/forms/chekoutForm";
import axios from "axios";
import { useUserContext } from "../context/userContext";

const stripePromise = loadStripe(Constants.stripe_public_key);

const Payments = () => {
  const { currentUser } = useUserContext();
  const [amount, setAmount] = useState(100);

  const [clientSecret, setClientSecret] = useState("");

  // useEffect(() => {
  //   const response = axios.post(
  //     Constants.apiGateway + "/payments/create-checkout-session",
  //     {
  //       amount: amount,
  //       userID: currentUser._id,
  //     },
  //     Constants.config
  //   );

  //   if (response.status === 200) {
  //     setClientSecret(response.data.clientSecret);
  //     Constants.notifySuccess("Checkout session created successfully");
  //   } else {
  //     Constants.notifyError("Error creating checkout session");
  //   }
  // }, []);

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(currentUser)
    try {
      const response = await axios.post(
        Constants.apiGateway + "/payments/create-checkout-session",
        {
          amount: amount,
          userID: currentUser._id,
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
          <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-black py-12">
            <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
              <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                <div className="flex flex-col items-center justify-center text-center space-y-2">
                  <div className="font-semibold text-3xl">
                    <p>Add Funds</p>
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
        </>
      )}
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm clientSecret={clientSecret} amount={amount} />
        </Elements>
      )}
    </div>
  );
};

export default Payments;
