/* eslint-disable sonarjs/no-duplicate-string */
import express from 'express';

import {
  createBoard,
  deleteBoard,
  getAllBoard,
  updateBoard,
} from '../controllers/boardControllers.js';
import { createCard, deleteCard, getAllCard, updateCard } from '../controllers/cardContollers.js';
import {
  createColumn,
  deleteColumn,
  getAllColumns,
  updateColumn,
} from '../controllers/columnControllers.js';
import validateBody from '../helpers/validateBody.js';
import authMiddleware from '../middleware/auth.js';
import { cascadeDeleteCards, cascadeDeleteColumnsAndCards } from '../middleware/boardMiddleware.js';
import {
  createBaardSchema,
  createCardSchema,
  createColumnSchema,
  updateBaardSchema,
  updateCardSchema,
  updateColumnSchema,
} from '../schemas/boardSchamas.js';
const boardRouter = express.Router();

boardRouter.use(authMiddleware);
boardRouter.post('/', validateBody(createBaardSchema), createBoard);
/**
 * @swagger
 * /api/boards/:
 *   post:
 *     summary: Create a new board.
 *     tags: [Boards]
 *     description: Create a new board in Task Pro.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Board creation details.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the board.
 *                 example: My New Board
 *               icon:
 *                 type: string
 *                 description: The icon for the board.
 *                 example: svg-icon-url
 *               background:
 *                 type: string
 *                 description: The background for the board.
 *                 example: img-background-url
 *     responses:
 *       201:
 *         description: Board created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the board.
 *                   example: 60d21b4667d0d8992e610c85
 *                 title:
 *                   type: string
 *                   description: The title of the board.
 *                   example: My New Board
 *                 icon:
 *                   type: string
 *                   description: The icon for the board.
 *                   example: svg-icon-url
 *                 background:
 *                   type: string
 *                   description: The background for the board.
 *                   example: img-background-url
 *                 owner:
 *                   type: string
 *                   description: The ID of the Board to which the board belongs.
 *                   example: 60d0fe4f5311236168a109ca
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
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

boardRouter.post('/columns/:id', validateBody(createColumnSchema), createColumn);
/**
 * @swagger
 * /api/boards/columns/{id}:
 *   post:
 *     summary: Create a new column.
 *     tags: [Columns]
 *     description: Create a new column in a specific board in Task Pro.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the board to which the column belongs.
 *     requestBody:
 *       description: Column creation details.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the column.
 *                 example:  New Column
 *     responses:
 *       201:
 *         description: Column created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the column.
 *                   example: 60d21b4667d0d8992e610c85
 *                 title:
 *                   type: string
 *                   description: The title of the column.
 *                   example: New Column
 *                 owner:
 *                   type: string
 *                   description: The ID of the column to which the column belongs.
 *                   example: 60d0fe4f5311236168a109ca
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
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

boardRouter.post('/cards/:id', validateBody(createCardSchema), createCard);
/**
 * @swagger
 * /api/boards/cards/{id}:
 *   post:
 *     summary: Create a new card.
 *     tags: [Cards]
 *     description: Create a new card in a specific column in Task Pro.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the column to which the card belongs.
 *     requestBody:
 *       description: Card creation details.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the card.
 *                 example: My New Card
 *               description:
 *                 type: string
 *                 description: The description of the card.
 *                 example: This is a new card
 *               priority:
 *                 type: string
 *                 description: The priority of the card.
 *                 example: low
 *               deadline:
 *                 type: number
 *                 description: The deadline of the card in Unix time.
 *                 example: 1717351234567
 *     responses:
 *       201:
 *         description: Card created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the card.
 *                   example: 60d21b4667d0d8992e610c85
 *                 title:
 *                   type: string
 *                   description: The title of the card.
 *                   example: My New Card
 *                 description:
 *                   type: string
 *                   description: The description of the card.
 *                   example: This is a new card
 *                 priority:
 *                   type: string
 *                   description: The priority of the card.
 *                   example: low
 *                 deadline:
 *                   type: number
 *                   description: The deadline of the card in Unix time.
 *                   example: 1717351234567
 *                 owner:
 *                   type: string
 *                   description: The ID of the column to which the card belongs.
 *                   example: 60d0fe4f5311236168a109ca
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
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

boardRouter.patch('/:id', validateBody(updateBaardSchema), updateBoard);
/**
 * @swagger
 * /api/boards/{id}:
 *   patch:
 *     summary: Update a board.
 *     tags: [Boards]
 *     description: Update the details of an existing board in Task Pro.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the board to be updated.
 *     requestBody:
 *       description: Board update details.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The new title of the board.
 *                 example: Updated Board Title
 *               icon:
 *                 type: string
 *                 description: The new icon for the board.
 *                 example: updated-icon-url
 *               background:
 *                 type: string
 *                 description: The new background for the board.
 *                 example: updated-background-url
 *     responses:
 *       200:
 *         description: Board updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the board.
 *                   example: 60d21b4667d0d8992e610c85
 *                 title:
 *                   type: string
 *                   description: The title of the board.
 *                   example: Updated Board Title
 *                 icon:
 *                   type: string
 *                   description: The icon for the board.
 *                   example: updated-icon-url
 *                 background:
 *                   type: string
 *                   description: The background for the board.
 *                   example: updated-background-url
 *                 owner:
 *                   type: string
 *                   description: The ID of the Board to which the board belongs.
 *                   example: 60d0fe4f5311236168a109ca
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: Помилка від Joi або іншої бібліотеки валідації
 *       404:
 *         description: Board not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: "not found"
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

boardRouter.put('/columns/:id', validateBody(updateColumnSchema), updateColumn);
/**
 * @swagger
 * /api/boards/columns/{id}:
 *   put:
 *     summary: Update a column.
 *     tags: [Columns]
 *     description: Update the details of an existing column in Task Pro.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the column to be updated.
 *     requestBody:
 *       description: Column update details.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The new title of the column.
 *                 example: Updated Column Title
 *     responses:
 *       200:
 *         description: Column updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the column.
 *                   example: 60d21b4667d0d8992e610c85
 *                 title:
 *                   type: string
 *                   description: The title of the column.
 *                   example: Updated Column Title
 *                 owner:
 *                   type: string
 *                   description: The ID of the column to which the column belongs.
 *                   example: 60d0fe4f5311236168a109ca
 *
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: Помилка від Joi або іншої бібліотеки валідації
 *       404:
 *         description: Column not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: "not found"
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
boardRouter.patch('/cards/:id', validateBody(updateCardSchema), updateCard);
/**
 * @swagger
 * /api/boards/cards/{id}:
 *   patch:
 *     summary: Update a card.
 *     tags: [Cards]
 *     description: Update the details of an existing card in Task Pro.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the card to be updated.
 *     requestBody:
 *       description: Card update details.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The new title of the card.
 *                 example: Updated Card Title
 *               description:
 *                 type: string
 *                 description: The new description of the card.
 *                 example: Updated description of the card
 *               priority:
 *                 type: string
 *                 description: The new priority of the card.
 *                 example: none
 *     responses:
 *       200:
 *         description: Card updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the card.
 *                   example: 60d21b4667d0d8992e610c85
 *                 title:
 *                   type: string
 *                   description: The title of the card.
 *                   example: Updated Card Title
 *                 description:
 *                   type: string
 *                   description: The description of the card.
 *                   example: Updated description of the card
 *                 priority:
 *                   type: string
 *                   description: The new priority of the card.
 *                   example: none
 *                 deadline:
 *                   type: number
 *                   description: The deadline of the card in Unix time.
 *                   example: 1717351234567
 *                 owner:
 *                   type: string
 *                   description: The ID of the column to which the card belongs.
 *                   example: 60d0fe4f5311236168a109ca
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: Помилка від Joi або іншої бібліотеки валідації
 *       404:
 *         description: Card not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: "not found"
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

boardRouter.delete('/:id', cascadeDeleteColumnsAndCards, deleteBoard);
/**
 * @swagger
 * /api/boards/{id}:
 *   delete:
 *     summary: Delete a board and related columns and cards.
 *     tags: [Boards]
 *     description: Delete an existing board along with all its related columns and cards in Task Pro.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the board to be deleted.
 *     responses:
 *       200:
 *         description: Board and related columns and cards deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the deleted board.
 *                   example: 60d21b4667d0d8992e610c85
 *                 title:
 *                   type: string
 *                   description: The title of the deleted board.
 *                   example: My Board
 *                 icon:
 *                   type: string
 *                   description: The icon of the deleted board.
 *                   example: icon-url
 *                 background:
 *                   type: string
 *                   description: The background of the deleted board.
 *                   example: background-url
 *                 owner:
 *                   type: string
 *                   description: The ID of the Board to which the board belongs.
 *                   example: 60d0fe4f5311236168a109ca
 *       404:
 *         description: Board not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: "not found"
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
boardRouter.delete('/columns/:id', cascadeDeleteCards, deleteColumn);
/**
 * @swagger
 * /api/boards/columns/{id}:
 *   delete:
 *     summary: Delete a column and related cards.
 *     tags: [Columns]
 *     description: Delete an existing column along with all its related cards in Task Pro.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the column to be deleted.
 *     responses:
 *       200:
 *         description: Column and related cards deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the deleted column.
 *                   example: 60d21b4667d0d8992e610c85
 *                 title:
 *                   type: string
 *                   description: The title of the deleted column.
 *                   example: My Column
 *                 owner:
 *                   type: string
 *                   description: The ID of the column to which the column belongs.
 *                   example: 60d0fe4f5311236168a109ca
 *       404:
 *         description: Column not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: "not found"
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
boardRouter.delete('/cards/:id', deleteCard);

/**
 * @swagger
 * /api/boards/cards/{id}:
 *   delete:
 *     summary: Delete a card.
 *     tags: [Cards]
 *     description: Delete an existing card in Task Pro.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the card to be deleted.
 *     responses:
 *       200:
 *         description: Card deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the deleted card.
 *                   example: 60d21b4667d0d8992e610c85
 *                 title:
 *                   type: string
 *                   description: The title of the deleted card.
 *                   example: My Card
 *                 description:
 *                   type: string
 *                   description: The description of the deleted card.
 *                   example: This is a card
 *                 priority:
 *                   type: string
 *                   description: The priority of the deleted card.
 *                   example: none
 *                 deadline:
 *                   type: number
 *                   description: The deadline of the deleted card in Unix time.
 *                   example: 1717351234567
 *                 owner:
 *                   type: string
 *                   description: The ID of the column to which the card belongs.
 *                   example: 60d0fe4f5311236168a109ca
 *       404:
 *         description: Card not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: "not found"
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

boardRouter.get('/', getAllBoard);
/**
 * @swagger
 * /api/boards:
 *   get:
 *     summary: Get all boards.
 *     tags: [Boards]
 *     description: Retrieve a list of all boards.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of boards.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The board ID.
 *                     example: 60d21b4667d0d8992e610c85
 *                   title:
 *                     type: string
 *                     description: The title of the board.
 *                     example: Project Board
 *                   icon:
 *                     type: string
 *                     description: The icon of the board.
 *                     example: icon-url
 *                   background:
 *                     type: string
 *                     description: The background of the board.
 *                     example: background-url
 *                   owner:
 *                     type: string
 *                     description: The ID of the user who owns the board.
 *                     example: 60d0fe4f5311236168a109ca
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

boardRouter.get('/columns/:id', getAllColumns);

/**
 * @swagger
 * /api/boards/columns/{id}:
 *   get:
 *     summary: Get all columns for a specific board.
 *     tags: [Columns]
 *     description: Retrieve a list of all columns for a specific board by its column owner id.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the board.
 *     responses:
 *       200:
 *         description: A list of columns for the specified board.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The column ID.
 *                     example: 60d21b4667d0d8992e610c85
 *                   title:
 *                     type: string
 *                     description: The title of the column.
 *                     example: To Do
 *                   owner:
 *                     type: string
 *                     description: The ID of the board to which the column belongs.
 *                     example: 66699a0b1ddd726fd095a980
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
boardRouter.get('/cards/:id', getAllCard);

/**
 * @swagger
 * /api/boards/cards/{id}:
 *   get:
 *     summary: Get all cards for a specific column.
 *     tags: [Cards]
 *     description: Retrieve a list of all cards for a specific column by its card owner id.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the column.
 *     responses:
 *       200:
 *         description: A list of cards for the specified column.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The card ID.
 *                     example: 6669929932fdf8b7cae94f80
 *                   title:
 *                     type: string
 *                     description: The title of the card.
 *                     example: New122kk
 *                   description:
 *                     type: string
 *                     description: The description of the card.
 *                     example: This is a new task description2112
 *                   labelcolor:
 *                     type: string
 *                     description: The label color of the card.
 *                     example: green
 *                   deadline:
 *                     type: number
 *                     description: The deadline of the card in Unix time.
 *                     example: 1717351234567
 *                   owner:
 *                     type: string
 *                     description: The ID of the column to which the card belongs.
 *                     example: 66698ddf91397969c068458f
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

export default boardRouter;
