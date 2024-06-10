import HttpError from '../helpers/HttpError.js';
import { sendHelpEmail } from '../helpers/needHelpMail.js';

export const sendFeedback = async (req, res, next) => {
  try {
    const { email, comment } = req.body;
    const emailSent = await sendHelpEmail(email, comment);
    if (!emailSent) throw new HttpError(500, 'Failed to send email');
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    next(error);
  }
};
