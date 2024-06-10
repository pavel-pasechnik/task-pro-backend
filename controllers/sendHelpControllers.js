import sendHelpEmail from '../helpers/mail.js';

export const sendFeedback = async (req, res, next) => {
  try {
    const { email, comment } = req.body;
    await sendHelpEmail(email, comment);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    next(error);
  }
};
