const express = require("express");
const router = express.Router();
const newsletterController = require("../controllers/newsletterController");

// router.use(verifyJWT)

router
  .route("/")
  .post(newsletterController.storeNewEmail)
  .get(newsletterController.getNewsletter);

//   .get(usersController.getAllUsers)

router.route("/send-newsletter").post(newsletterController.sendNewsletter);

module.exports = router;
