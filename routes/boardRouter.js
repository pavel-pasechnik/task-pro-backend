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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: "Invalid input data"
 */

boardRouter.post('/columns/:id', validateBody(createColumnSchema), createColumn);
/**
 * @swagger
 * /api/board/columns/{id}:
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
 *                   example: New Column
 *
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
 *                   example: "Invalid input data"
 */

boardRouter.post('/cards/:id', validateBody(createCardSchema), createCard);
/**
 * @swagger
 * /api/board/cards/{id}:
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
 *         description: Bad request. Invalid input data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: "Invalid input data"
 */

boardRouter.put('/:id', validateBody(updateBaardSchema), updateBaard);
/**
 * @swagger
 * /api/board/{id}:
 *   put:
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
 *                 _id:
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
 *                   example: "Invalid input data"
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
 *                   example: "Board not found"
 */

boardRouter.put('/columns/:id', validateBody(updateColumnSchema), updateColumn);
/**
 * @swagger
 * /api/board/columns/{id}:
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
 *                 _id:
 *                   type: string
 *                   description: The ID of the column.
 *                   example: 60d21b4667d0d8992e610c85
 *                 title:
 *                   type: string
 *                   description: The title of the column.
 *                   example: Updated Column Title
 *
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
 *                   example: "Invalid input data"
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
 *                   example: "Column not found"
 */
boardRouter.put('/cards/:id', validateBody(updateCardSchema), updateCard);
/**
 * @swagger
 * /api/board/cards/{id}:
 *   put:
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
 *               labelcolor:
 *                 type: string
 *                 description: The new label color of the card.
 *                 example: blue
 *               deadline:
 *                 type: number
 *                 description: The new deadline of the card in Unix time.
 *                 example: 1717351234567
 *     responses:
 *       200:
 *         description: Card updated successfully.
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
 *                   example: Updated Card Title
 *                 description:
 *                   type: string
 *                   description: The description of the card.
 *                   example: Updated description of the card
 *                 labelcolor:
 *                   type: string
 *                   description: The label color of the card.
 *                   example: blue
 *                 deadline:
 *                   type: number
 *                   description: The deadline of the card in Unix time.
 *                   example: 1717351234567
 *                 owner:
 *                   type: string
 *                   description: The ID of the column to which the card belongs.
 *                   example: 60d0fe4f5311236168a109ca
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
 *                   example: "Invalid input data"
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
 *                   example: "Card not found"
 */

boardRouter.delete('/:id', cascadeDeleteColumnsAndCards, deleteBaard);
/**
 * @swagger
 * /api/board/{id}:
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
 *                 _id:
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
 *                   example: "Invalid input data"
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
 *                   example: "Board not found"
 */
boardRouter.delete('/columns/:id', cascadeDeleteCards, deleteColumn);
/**
 * @swagger
 * /api/board/columns/{id}:
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
 *                 _id:
 *                   type: string
 *                   description: The ID of the deleted column.
 *                   example: 60d21b4667d0d8992e610c85
 *                 title:
 *                   type: string
 *                   description: The title of the deleted column.
 *                   example: My Column
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
 *                   example: "Invalid input data"
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
 *                   example: "Column not found"
 */
boardRouter.delete('/cards/:id', deleteCard);

/**
 * @swagger
 * /api/board/cards/{id}:
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
 *                 _id:
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
 *                 labelcolor:
 *                   type: string
 *                   description: The label color of the deleted card.
 *                   example: red
 *                 deadline:
 *                   type: number
 *                   description: The deadline of the deleted card in Unix time.
 *                   example: 1717351234567
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
 *                   example: "Invalid input data"
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
 *                   example: "Card not found"
 */
export default boardRouter;
