import sendHelpEmail from '../helpers/mail.js';

export const sendFeedback = async (req, res, next) => {
  const { email, comment } = req.body;

  await sendHelpEmail(email, comment);
};
