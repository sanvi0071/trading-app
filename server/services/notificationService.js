const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport();

const sendEmailNotification = (to, subject, text) => {
  const mailOptions = {
    from: 'no-reply@yourdomain.com',
    to,
    subject,
    text
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    }
  });
};

module.exports = { sendEmailNotification };
