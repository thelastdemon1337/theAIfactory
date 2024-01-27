const sendContactUsMail = require("../utils/contactUsEmail");

const sendContectUsEmail = async (req, res) => {
  try {
    const { from, subject, body, name } = req.body;

    if (!from || !subject || !body || !name) {
      return res
        .status(400)
        .json({ message: "All fields except password are required" });
    }

    // Send email
    sendContactUsMail(from, subject, body, name);

    res
      .status(200)
      .json({ success: true, message: "Emails sent successfully" });
  } catch (error) {
    console.error("Error sending emails:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  sendContectUsEmail,
};
