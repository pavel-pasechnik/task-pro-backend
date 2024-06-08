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
 *         description: Bad request. Invalid input data.
 */

boardRouter.post('/columns/:id', validateBody(createColumnSchema), createColumn);
boardRouter.post('/cards/:id', validateBody(createCardSchema), createCard);

boardRouter.put('/:id', validateBody(updateBaardSchema), updateBaard);
boardRouter.put('/columns/:id', validateBody(updateColumnSchema), updateColumn);
boardRouter.put('/cards/:id', validateBody(updateCardSchema), updateCard);

boardRouter.delete('/:id', cascadeDeleteColumnsAndCards, deleteBaard);
boardRouter.delete('/columns/:id', cascadeDeleteCards, deleteColumn);
boardRouter.delete('/cards/:id', deleteCard);

export default boardRouter;
