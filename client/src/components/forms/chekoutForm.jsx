import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import * as Constants from "../../utils/constants";
import { useUserContext } from "../../context/userContext";
import axios from "axios";

const CheckoutForm = ({ clientSecret, amount }) => {
  const { currentUser, getUserDetails } = useUserContext();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);

  const handleTokenUpdates = async () => {
    try {
      const response = await axios.patch(
        Constants.apiGateway + "/payments/create-checkout-session",
        {
          amount: amount,
          userID: currentUser._id,
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
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser?.fullname,
          email: currentUser?.email,
        },
      },
    });
    console.log(result);
    if (result.error) {
      Constants.notifyError("Payment Declined");
      console.log(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        await handleTokenUpdates();
        await getUserDetails(currentUser.email, currentUser.accessToken);
        Constants.notifySuccess("Payment successful");
      } else {
        console.log("Payment Processed");
      }
      setIsLoading(false);
    }
  };

  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };
  return (
    <form id="payment-form" onSubmit={handleSubmit} className="bg-white">
      <CardElement options={CARD_ELEMENT_OPTIONS} />
      <button type="submit" color="primary">
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
