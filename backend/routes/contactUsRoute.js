const express = require("express");
const router = express.Router();
const contactUsController = require("../controllers/contactUsController");

// router.use(verifyJWT)

router
  .route("/")
  .post(contactUsController.sendContectUsEmail)


module.exports = router;
