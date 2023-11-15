const nodemailer = require('nodemailer');
require('dotenv').config();

// Create a transporter with your Gmail account
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nestinbk@gmail.com',
        pass: process.env.EMAIL_APP_PASSWORD,
    },
});


const mailOptions = {
    from: 'nestinbk@gmail.com',
    to: 'nestibry@gmail.com',
    subject: 'Hello from Nodemailer! - ENV variable',
    text: 'This is a test email sent using Nodemailer. Using an environment variable',
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
});

