/* eslint-disable sonarjs/no-duplicate-string */
import express from 'express';

import { createBaard, deleteBaard, updateBaard } from '../controllers/baardControllers.js';
import { createCard, deleteCard, updateCard } from '../controllers/cardContollers.js';
import { createColumn, deleteColumn, updateColumn } from '../controllers/columnControllers.js';
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
} from '../schemas/baardSchamas.js';
const boardRouter = express.Router();

boardRouter.use(authMiddleware);
boardRouter.post('/', validateBody(createBaardSchema), createBaard);
/**
 * @swagger
 * /api/board/:
 *   post:
 *     summary: Create a new board.
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
 *                 example: default-icon-url
 *               background:
 *                 type: string
 *                 description: The background for the board.
 *                 example: default-background-url
 *     responses:
 *       200:
 *         description: Board created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
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
 *                   example: default-icon-url
 *                 background:
 *                   type: string
 *                   description: The background for the board.
 *                   example: default-background-url
 *       400:
 *         description:  Invalid input data.
 */

boardRouter.post('/columns/:id', validateBody(createColumnSchema), createColumn);
/**
 * @swagger
 * /api/board/columns/{id}:
 *   post:
 *     summary: Create a new column.
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
 *                 example: My New Column
 *     responses:
 *       200:
 *         description: Column created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The ID of the column.
 *                   example: 60d21b4667d0d8992e610c85
 *                 title:
 *                   type: string
 *                   description: The title of the column.
 *                   example: My New Column
 *
 *       400:
 *         description:  Invalid input data.
 */

boardRouter.post('/cards/:id', validateBody(createCardSchema), createCard);
/**
 * @swagger
 * /api/board/cards/{id}:
 *   post:
 *     summary: Create a new card.
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
 *               labelcolor:
 *                 type: string
 *                 description: The label color of the card.
 *                 example: red
 *               deadline:
 *                 type: number
 *                 description: The deadline of the card in Unix time.
 *                 example: 1717351234567
 *     responses:
 *       200:
 *         description: Card created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
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
 *                 labelcolor:
 *                   type: string
 *                   description: The label color of the card.
 *                   example: red
 *                 deadline:
 *                   type: number
 *                   description: The deadline of the card in Unix time.
 *                   example: 1717351234567
 *
 *       400:
 *         description:  Invalid input data.
 */

boardRouter.put('/:id', validateBody(updateBaardSchema), updateBaard);
boardRouter.put('/columns/:id', validateBody(updateColumnSchema), updateColumn);
boardRouter.put('/cards/:id', validateBody(updateCardSchema), updateCard);

boardRouter.delete('/:id', cascadeDeleteColumnsAndCards, deleteBaard);
boardRouter.delete('/columns/:id', cascadeDeleteCards, deleteColumn);
boardRouter.delete('/cards/:id', deleteCard);

export default boardRouter;
