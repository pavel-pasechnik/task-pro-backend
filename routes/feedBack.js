import express from 'express';

import { sendFeedback } from '../controllers/sendHelpControllers.js';
import validateBody from '../helpers/validateBody.js';
import { sendHelpSchema } from '../schemas/sendheplSchemas.js';

const feedbackRouter = express.Router();

feedbackRouter.post('/', validateBody(sendHelpSchema), sendFeedback);

export default feedbackRouter;
