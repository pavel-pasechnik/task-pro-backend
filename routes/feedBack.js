import express from 'express';

import { sendFeedback } from '../controllers/sendHelpControllers.js';
import validateBody from '../helpers/validateBody.js';
import auth from '../middleware/auth.js';
import { sendHelpSchema } from '../schemas/sendheplSchemas.js';

const feedbackRouter = express.Router();

feedbackRouter.use(auth);
/**
 * @swagger
 * /api/feedback:
 *   post:
 *     summary: Send feedback email.
 *     tags: [Public Routes]
 *     description: Send an email with user feedback to the support team.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: User feedback details.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address.
 *                 example: user@example.com
 *               comment:
 *                 type: string
 *                 description: User's feedback comment.
 *                 example: I need help with my account.
 *     responses:
 *       200:
 *         description: Feedback email sent successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message.
 *                   example: Email sent successfully.
 *       400:
 *         description: Bad request. Invalid input data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: Invalid input data.
 *       500:
 *         description: Server error. Failed to send email.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: Failed to send email.
 */
feedbackRouter.post('/', validateBody(sendHelpSchema), sendFeedback);

export default feedbackRouter;
