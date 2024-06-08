import express from 'express';

import {
  createUser,
  currentUser,
  loginUser,
  logoutUser,
  updateAvatar,
} from '../controllers/usersControllers.js';
import validateBody from '../helpers/validateBody.js';
import authMiddleware from '../middleware/auth.js';
import uploadMiddleware from '../middleware/upload.js';
import { createUserSchema, loginUserSchema } from '../schemas/usersSchemas.js';

const usersRouter = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/users/current:
 *   get:
 *     summary: Getting information about the current Task Pro user.
 *     description: Retrieve information about the currently authenticated user.
 *     parameters:
 *     - in: header
 *       name: Authorization
 *       required: true
 *       description: Bearer token for authorization.
 *       schema:
 *         type: string
 *         example: Bearer <token>
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
 *                        example: Light
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
 *     summary: Register a new Task Pro user.
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
 *     summary: Authenticate a Task Pro user.
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
 *                     theme:
 *                       type: string
 *                       description: The user's theme.
 *                       example: Light
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
 * /api/users/logout:
 *   post:
 *     summary: Logout a Task Pro user.
 *     description: Logout from the current user session.
 *     parameters:
 *     - in: header
 *       name: Authorization
 *       required: true
 *       description: Bearer token for authorization.
 *       schema:
 *         type: string
 *         example: Bearer <token>
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

/**
 * @swagger
 * /api/users/avatars :
 *   patch:
 *     summary: Update the current user's avatar.
 *     description: Upload and set a new avatar for the current user.
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
 *     security:
 *     - bearerAuth: []
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
 *         description: Invalid file format.
 *       401:
 *         description: Unauthorized, token is missing or invalid.
 */

usersRouter.patch('/avatars', authMiddleware, uploadMiddleware.single('avatar'), updateAvatar);

export default usersRouter;
