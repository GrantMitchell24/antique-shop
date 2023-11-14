const nodemailer = require('nodemailer');

// Create a transporter with your Gmail account
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nestinbk@gmail.com',
    pass: 'iyey bhtx lxxt myla',
  },
});

const mailOptions = {
    from: 'nestinbk@gmail.com',
    to: 'nestibry@gmail.com',
    subject: 'Hello from Nodemailer!',
    text: 'This is a test email sent using Nodemailer.',
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });