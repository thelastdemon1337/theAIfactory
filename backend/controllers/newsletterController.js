const Newsletter = require("../models/newsletter");
const sendEmail = require("../utils/nodemailer");
const { client } = require("../config/sanity");

const getNewsletter = async (req, res) => {
  try {
    const newsletters = await client.fetch(
      '*[_type == "newsletter"] | order(_createdAt desc) [0]'
    );
    console.log(newsletters);
    res
      .status(200)
      .json({ success: true, message: "Newsletter fetched successfully" });
  } catch (error) {
    console.error("Error sending emails:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const storeNewEmail = async (req, res) => {
  const { email } = req.body;
  console.log(req.body);

  try {
    // Confirm data
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Check for duplicate email
    const duplicate = await Newsletter.findOne({ email })
      .collation({ locale: "en", strength: 2 })
      .lean()
      .exec();

    if (duplicate) {
      return res.status(409).json({ message: "Duplicate email" });
    }

    const newsletterObject = new Newsletter({
      email: req.body.email,
    });

    // Create and store new email
    const newsletter = await Newsletter.create(newsletterObject);

    const subject = "TheAIFactory Newsletter";
    const text = "You have signed up for our newsletter";

    if (newsletter) {
      sendEmail(email, subject, text);
    }

    return res.status(200).send({
      message: "Newsletter signup successful",
      email: newsletter.email,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const sendNewsletter = async (req, res) => {
  try {
    const { subject, body } = req.body;

    const result = await Newsletter.find();

    const emails = result.map((entry) => entry.email).join(", ");

    // Send emails
    sendEmail(emails, subject, body);

    res
      .status(200)
      .json({ success: true, message: "Emails sent successfully" });
  } catch (error) {
    console.error("Error sending emails:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  storeNewEmail,
  sendNewsletter,
  getNewsletter,
};
