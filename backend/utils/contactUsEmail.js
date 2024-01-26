const nodemailer = require('nodemailer');

const sendContactUsMail = async (from, subject, text, name) => {

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: 'metamist2023@gmail.com',
      pass: 'utxc lnue xcgb dvfn'
    }
  });

  const mailOptions = {
    from: name,
    to: "contact@theaifactory.in",
    subject: subject,
    text: text
  };
  console.log(mailOptions)

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

module.exports = sendContactUsMail;
