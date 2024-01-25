const express = require("express");
const router = express.Router();
const chatgptControlller = require("../controllers/chatgptControlller");

// router.use(verifyJWT)

router
  .route("/")
  .get(chatgptControlller.createNewConversation)
  .post(chatgptControlller.getChatGPTResponse)

router.route("/conversation").get(chatgptControlller.getConversations);


module.exports = router;
