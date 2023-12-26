const express = require("express");
const router = express.Router();
const usersController = require("../controllers/userControllers");
const verifyJWT = require("../middleware/verifyJwtToken");

// router.use(verifyJWT)

router
  .route("/")
  .get(usersController.getAllUsers)
  .post(usersController.createNewUser)
  .patch(usersController.updateUser);
// .delete(usersController.deleteUser)

router.route("/user").get(usersController.getUserByEmail);

router.route("/otp/validate").post(usersController.otpValidate);

router.route("/reset-password").post(usersController.resetPassword);

module.exports = router;
