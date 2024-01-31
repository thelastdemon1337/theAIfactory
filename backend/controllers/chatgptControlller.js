const User = require("../models/user");
const Conversation = require("../models/conversation");
const Constants = require("../utils/constants");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const OpenAI = require("openai");

// const openai = require('openai');
// openai.apiKey = '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';

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

const activeConversations = {};

const getChatGPTResponse = async (req, res) => {
  const { prompt, userID, tokens } = req.body;

  try {
    if (!prompt || typeof prompt !== "string" || !userID) {
      return res.status(400).json({ message: "Invalid Data" });
    }
    const user = await User.findById(userID);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.tokens < tokens && tokens > 0) {
      return res
        .status(404)
        .json({ success: false, message: "Unsufficient tokens" });
    }

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    console.log(completion.choices[0].message.content);

    const response = {
      reply: completion.choices[0].message.content,
    };

    //Subtracting tokens from usen tokens
    if(tokens>0){
      user.tokens -= tokens;
    }

    await user.save();

    // Check if the user has an active conversation
    let conversationName = activeConversations[userID];

    if (!conversationName) {
      // If not, generate a new conversation name
      conversationName = await generateConversationName(prompt);
      activeConversations[userID] = conversationName;
    }

    // Check if the user has an active conversation
    // const conversationName = await generateConversationName(prompt);
    // activeConversations[userID] = conversationName;

    // console.log(conversationName)

    const existingConversation = await Conversation.findOne({
      userID,
      conversationName,
    });

    if (existingConversation) {
      existingConversation.messages.push({ sender: "user", text: prompt });
      existingConversation.messages.push({
        sender: "bot",
        text: response.reply,
      });
      await existingConversation.save();
    } else {
      // Create a new conversation
      const newConversation = new Conversation({
        userID,
        conversationName,
        messages: [
          { sender: "user", text: prompt },
          { sender: "bot", text: response.reply },
        ],
      });

      await newConversation.save();
    }

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
};

const createNewConversation = async (req, res) => {
  const { userID } = req.query;
  try {
    if (!userID) {
      return res.status(400).json({ message: "Invalid Data" });
    }
    delete activeConversations[userID];

    res.status(200).json({ message: "new conversation" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
};

const getConversations = async (req, res) => {
  try {
    const { userID } = req.query;

    const conversations = await Conversation.find({ userID }).sort({
      createdAt: -1,
    });

    res.status(200).json({ success: true, conversations });
  } catch (error) {
    console.error("Error retrieving conversations:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Function to generate a random conversation name
const generateConversationName = async (prompt) => {
  return prompt.slice(0, 32);
};

module.exports = {
  getChatGPTResponse,
  createNewConversation,
  getConversations,
};
