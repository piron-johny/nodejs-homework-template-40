const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendEmail = async (data) => {
  try {
    await sgMail.send({ ...data, from: process.env.EMAIL_FROM})
  } catch (error) {
    throw error;
  }
};

module.exports = sendEmail;

