import 'dotenv/config';
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USERNAME,
    pass: process.env.MAILTRAP_USERPASSWORD,
  },
});

export const sendHelpEmail = async (userEmail, userComment) => {
  const emailData = {
    from: process.env.MAILTRAP_USERNAME,
    to: 'taskpro.project@gmail.com',
    subject: 'Help Request',
    text: `User Comment: ${userComment} User Email: ${userEmail}`,
  };

  try {
    await transport.sendMail(emailData);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};
