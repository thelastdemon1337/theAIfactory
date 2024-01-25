const express = require("express");
const router = express.Router();
const paymentsController = require("../controllers/paymentController");
const verifyJWT = require("../middleware/verifyJwtToken");

// router.use(verifyJWT)

router
  .route("/create-checkout-session")
  .post(paymentsController.createCheckoutSession)
  .patch(paymentsController.updateUserPaymentDetails);
  

router.route("/webhooks").post(paymentsController.webhookUpdates);

module.exports = router;
