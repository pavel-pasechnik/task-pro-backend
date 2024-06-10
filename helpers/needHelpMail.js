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
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #333;">Help Request</h2>
        <p><strong>User Email:</strong> ${userEmail}</p>
        <p><strong>User Comment:</strong></p>
        <p style="background: #f9f9f9; padding: 10px; border-radius: 5px;">${userComment}</p>
      </div>
    `,
  };

  try {
    await transport.sendMail(emailData);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};
