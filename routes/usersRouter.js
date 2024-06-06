import express from 'express';

import {
  createUser,
  currentUser,
  loginUser,
  logoutUser,
  subscriptionUpdate,
  updateAvatar,
  verifyCheck,
  verifyUser,
} from '../controllers/usersControllers.js';
import validateBody from '../helpers/validateBody.js';
import authMiddleware from '../middleware/auth.js';
import uploadMiddleware from '../middleware/upload.js';
import {
  createUserSchema,
  loginUserSchema,
  updateUserSubscriptionSchema,
  verifyCheckSchema,
} from '../schemas/usersSchemas.js';

const usersRouter = express.Router();
/**
 * @swagger
 * /current:
 *   get:
 *     summary: Retrieve a list of Task Pro users
 *     description: Returns information about the current user from Task Pro.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The user ID.
 *                   example: 0
 *                 name:
 *                    type: string
 *                    description: The user's name.
 *                    example: Leanne Graham
 */
usersRouter.get('/current', authMiddleware, currentUser);
usersRouter.get('/verify/:verificationToken', verifyUser);
usersRouter.post('/verify', validateBody(verifyCheckSchema), verifyCheck);
usersRouter.post('/register', validateBody(createUserSchema), createUser);
usersRouter.post('/login', validateBody(loginUserSchema), loginUser);
usersRouter.post('/logout', authMiddleware, logoutUser);
usersRouter.patch(
  '/',
  authMiddleware,
  validateBody(updateUserSubscriptionSchema),
  subscriptionUpdate
);
usersRouter.patch('/avatars', authMiddleware, uploadMiddleware.single('avatar'), updateAvatar);

export default usersRouter;
