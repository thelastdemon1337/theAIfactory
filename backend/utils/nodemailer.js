const nodemailer = require('nodemailer');

const sendMail = async (toEmail, subject, text) => {

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: 'metamist2023@gmail.com',
      pass: 'utxc lnue xcgb dvfn'
    }
  });

  const mailOptions = {
    from: 'metamist2023@gmail.com',
    to: toEmail,
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

module.exports = sendMail;
