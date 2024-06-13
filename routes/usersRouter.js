import express from 'express';

import {
  createUser,
  currentUser,
  loginUser,
  logoutUser,
  needHelp,
  updateAvatar,
  updateTheme,
  updateUser,
} from '../controllers/usersControllers.js';
import validateBody from '../helpers/validateBody.js';
import authMiddleware from '../middleware/auth.js';
import uploadMiddleware from '../middleware/upload.js';
import {
  createUserSchema,
  loginUserSchema,
  needHelpSchema,
  updateThemeSchema,
  updateUserSchema,
} from '../schemas/usersSchemas.js';

const usersRouter = express.Router();

/**
 * @swagger
 * /api/users/current:
 *   get:
 *     summary: Getting information about the current user.
 *     tags: [Users]
 *     description: Retrieve information about the currently authenticated user.
 *     security:
 *     - bearerAuth: []
 *     responses:
 *       200:
 *         description: Information about the current user.
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  user:
 *                    type: object
 *                    properties:
 *                      name:
 *                        type: string
 *                        description: The user's name.
 *                        example: Leanne Graham
 *                      email:
 *                        type: string
 *                        description: The user's email.
 *                        example: leanne@example.com
 *                      avatarURL:
 *                        type: string
 *                        description: The user's avatar url.
 *                        example: http://avatar/Leanne-Graham.jpeg
 *                      theme:
 *                        type: string
 *                        description: The user's theme.
 *                        example: light
 *       401:
 *         description: Unauthorized, token is missing or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message.
 *                   example: Not authorized
 */

usersRouter.get('/current', authMiddleware, currentUser);

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user.
 *     tags: [Auth]
 *     description: Create a new user account.
 *     requestBody:
 *       description: User registration details.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's name
 *                 example: Test
 *               email:
 *                 type: string
 *                 description: User's email.
 *                 example: test@test.com
 *               password:
 *                 type: string
 *                 description: User's password.
 *                 example: password
 *     responses:
 *       201:
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  user:
 *                    type: object
 *                    properties:
 *                      name:
 *                        type: string
 *                        description: The user's name.
 *                        example: Leanne Graham
 *                      email:
 *                        type: string
 *                        description: The user's email.
 *                        example: leanne@example.com
 *       400:
 *         description: Invalid input.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message.
 *                   example: Помилка від Joi або іншої бібліотеки валідації
 *       409:
 *         description: Email in use.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message.
 *                   example: Email in use
 */

usersRouter.post('/register', validateBody(createUserSchema), createUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Authenticate user.
 *     tags: [Auth]
 *     description: Login to an existing user account.
 *     requestBody:
 *       description: User login details.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email.
 *                 example: test@test.com
 *               password:
 *                 type: string
 *                 description: User's password.
 *                 example: password
 *     responses:
 *       200:
 *         description: User authenticated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Authentication token.
 *                   example: jwt.token.here
 *                 user:
 *                   type: object
 *                   description: User data.
 *                   properties:
 *                     avatarURL:
 *                       type: string
 *                       description: The user's avatar url.
 *                       example: http://avatar/Leanne-Graham.jpeg
 *                     name:
 *                       type: string
 *                       description: The user's name.
 *                       example: Leanne Graham
 *                     theme:
 *                       type: string
 *                       description: The user's theme.
 *                       example: light
 *       401:
 *         description: Unauthorized, email or password is incorrect.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message.
 *                   example: Email or password is wrong
 */

usersRouter.post('/login', validateBody(loginUserSchema), loginUser);

/**
 * @swagger
 * /api/users:
 *   patch:
 *     summary: Update current user.
 *     tags: [Users]
 *     description: Update current user.
 *     security:
 *     - bearerAuth: []
 *     requestBody:
 *       description: User update details.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's name
 *                 example: Test
 *               email:
 *                 type: string
 *                 description: User's email.
 *                 example: test@test.com
 *               password:
 *                 type: string
 *                 description: User's password.
 *                 example: password
 *     responses:
 *       200:
 *         description: User update successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Authentication token.
 *                   example: jwt.token.here
 *                 user:
 *                   type: object
 *                   description: User data.
 *                   properties:
 *                     email:
 *                       type: string
 *                       description: The user's email.
 *                       example: test@test.com
 *                     name:
 *                       type: string
 *                       description: The user's name.
 *                       example: Leanne Graham
 *       409:
 *         description: Email in use.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message.
 *                   example: Email in use
 */

usersRouter.patch('/', authMiddleware, validateBody(updateUserSchema), updateUser);

/**
 * @swagger
 * /api/users/avatars :
 *   patch:
 *     summary: Update the current user's avatar.
 *     tags: [Users]
 *     description: Upload and set a new avatar for the current user.
 *     security:
 *     - bearerAuth: []
 *     requestBody:
 *       description: New avatar file.
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Avatar updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 avatarURL:
 *                   type: string
 *                   description: URL to the updated avatar.
 *                   example: http://avatar/Leanne-Graham-new.jpeg
 *       400:
 *         description: Invalid file type.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message.
 *                   example: Invalid file type
 *       401:
 *         description: Unauthorized, token is missing or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message.
 *                   example: Not authorized
 */

usersRouter.patch('/avatars', authMiddleware, uploadMiddleware.single('avatar'), updateAvatar);

/**
 * @swagger
 * /api/users/themes :
 *   patch:
 *     summary: Update the current user's theme.
 *     tags: [Users]
 *     description: Set a new theme for the current user.
 *     security:
 *     - bearerAuth: []
 *     requestBody:
 *       description: New theme.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               theme:
 *                 type: string
 *                 example: dark
 *     responses:
 *       200:
 *         description: Theme updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 theme:
 *                   type: string
 *                   description: Updated theme.
 *                   example: dark
 *       400:
 *         description: Invalid input.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message.
 *                   example: Помилка від Joi або іншої бібліотеки валідації
 *       401:
 *         description: Unauthorized, token is missing or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message.
 *                   example: Not authorized
 */

usersRouter.patch('/themes', authMiddleware, validateBody(updateThemeSchema), updateTheme);

/**
 * @swagger
 * /api/users/help:
 *   post:
 *     summary: Send need help email.
 *     tags: [Users]
 *     description: Send an email with user message to the support team.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: User need help details.
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
 *                 description: User's need help comment.
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
usersRouter.post('/help', authMiddleware, validateBody(needHelpSchema), needHelp);

/**
 * @swagger
 * /api/users/logout:
 *   post:
 *     summary: Logout current user.
 *     tags: [Users]
 *     description: Logout from the current user session.
 *     security:
 *     - bearerAuth: []
 *     responses:
 *       204:
 *         description: No Content. User logged out successfully.
 *       401:
 *         description: Unauthorized, token is missing or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message.
 *                   example: Not authorized
 */

usersRouter.post('/logout', authMiddleware, logoutUser);

export default usersRouter;
