import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendHelpEmail = async (userEmail, userComment) => {
  const emailData = {
    to: 'taskpro.project@gmail.com',
    from: process.env.EMAIL_SENDER,
    subject: 'Help Request',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #333;">Help Request</h2>
        <p><strong>User Email:</strong> ${userEmail}</p>
        <p><strong>User Comment:</strong></p>
        <p style="background: #f9f9f9; padding: 10px; border-radius: 5px;">${userComment}</p>
      </div>
    `,
    text: `User Email: ${userEmail}\nUser Comment: ${userComment}`,
  };

  return await sgMail.send(emailData);
};

export default sendHelpEmail;
