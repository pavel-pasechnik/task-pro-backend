import express from 'express';

import { sendFeedback } from '../controllers/sendHelpControllers.js';

const feedbackRouter = express.Router();

feedbackRouter.post('/', sendFeedback);

export default feedbackRouter;
