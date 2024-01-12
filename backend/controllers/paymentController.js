const User = require("../models/user");
const Transaction = require("../models/transaction");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
  const { amount, userID } = req.body;

  if (!amount || !userID) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findById(userID);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "inr",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    console.log(paymentIntent.client_secret);
    return res.status(200).send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


const updateUserPaymentDetails = async (req, res) => {
  const { userID, amount } = req.body;
  try {
    if (!userID || !amount) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findById(userID);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Create a transaction record
    const transaction = new Transaction({
      amount,
      user: user._id,
    });

    // Save the transaction record
    await transaction.save();

    // Add the transaction to the user's transactions array
    user.transactions.push(transaction._id);

    //Creating tokens
    tokens = amount * 2;

    // Add the tokensEarned to the user's existing tokens
    user.tokens += tokens;

    // Save the updated user object
    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const webhookUpdates = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  console.log(`Unhandled event type ${event.type}`);
  switch (event.type) {
    case "checkout.session.async_payment_failed":
      const checkoutSessionAsyncPaymentFailed = event.data.object;
      // Then define and call a function to handle the event checkout.session.async_payment_failed
      break;
    case "checkout.session.async_payment_succeeded":
      const checkoutSessionAsyncPaymentSucceeded = event.data.object;
      // Then define and call a function to handle the event checkout.session.async_payment_succeeded
      break;
    case "checkout.session.completed":
      const checkoutSessionCompleted = event.data.object;
      // Then define and call a function to handle the event checkout.session.completed
      break;
    case "checkout.session.expired":
      const checkoutSessionExpired = event.data.object;
      // Then define and call a function to handle the event checkout.session.expired
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  // Return a 200 response to acknowledge receipt of the event
  res.send();
};

module.exports = {
  createCheckoutSession,
  updateUserPaymentDetails,
  webhookUpdates,
};
