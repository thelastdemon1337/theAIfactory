import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  CardElement,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import * as Constants from "../../utils/constants";
import { useUserContext } from "../../context/userContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ clientSecret, amount }) => {
  const { currentUser, getUserDetails } = useUserContext();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleTokenUpdates = async () => {
    try {
      const response = await axios.patch(
        Constants.apiGateway + "/payments/create-checkout-session",
        {
          amount: amount,
          userID: currentUser?._id,
        },
        Constants.config
      );

      if (response.status === 200) {
        Constants.notifySuccess("Token assigned successfully");
      } else {
        Constants.notifyError("Error Assigning tokens");
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(
          CardCvcElement,
          CardExpiryElement,
          CardNumberElement
        ),
        billing_details: {
          name: currentUser?.fullname,
          email: currentUser?.email,
        },
      },
    });
    if (result.error) {
      Constants.notifyError("Payment Declined");
      console.log(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        await handleTokenUpdates();
        await getUserDetails(currentUser?.email, currentUser?.accessToken);
        Constants.notifySuccess("Payment successful");
        navigate("/ai-tools");
      } else {
        console.log("Payment Processed");
      }
      setIsLoading(false);
    }
  };

  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: "white",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "white",
        iconColor: "white",
      },
    },
  };

  return (
    <>
      <div className="max-w-md mx-auto mb-6 flex min-h-screen flex-col justify-center bg-transparent rounded-lg shadow-md overflow-hidden">
        <div className="bg-gray-900 rounded-lg">
          <div className="px-4 py-3 bg-transparent text-white">
            <h1 className="text-lg font-bold">Card Information</h1>
          </div>
          <div className="px-4 py-3">
            <div className="mb-3">
              <label
                className="block text-white font-bold mb-1"
                htmlFor="card-number"
              >
                Card Number
              </label>
              <CardNumberElement
                options={CARD_ELEMENT_OPTIONS}
                className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-3">
              <label
                className="block text-white font-bold mb-1"
                htmlFor="expiration-date"
              >
                Expiration Date
              </label>
              <CardExpiryElement
                options={CARD_ELEMENT_OPTIONS}
                className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-3">
              <label className="block text-white font-bold mb-1" htmlFor="cvv">
                CVV
              </label>
              <CardCvcElement
                options={CARD_ELEMENT_OPTIONS}
                className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <button
              onClick={handleSubmit}
              className={`w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:shadow-outline-blue active:bg-red-800 ${
                isLoading ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Pay Now"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutForm;
