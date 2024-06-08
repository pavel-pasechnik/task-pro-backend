import express from 'express';

import { createBaard, deleteBaard, updateBaard } from '../controllers/baardControllers.js';
import { createCard, deleteCard, updateCard } from '../controllers/cardContollers.js';
import { createColumn, deleteColumn, updateColumn } from '../controllers/columnControllers.js';
import validateBody from '../helpers/validateBody.js';
import authMiddleware from '../middleware/auth.js';
import { createBaardSchema } from '../schemas/baardSchamas.js';
const boardRouter = express.Router();

boardRouter.use(authMiddleware);
boardRouter.post('/add', validateBody(createBaardSchema), createBaard);
boardRouter.post('/column/add/:id', createColumn);
boardRouter.post('/card/add/:id', createCard);

boardRouter.put('/edit/:id', validateBody(createBaardSchema), updateBaard);
boardRouter.put('/column/edit/:id', updateColumn);
boardRouter.put('/card/edit/:id', updateCard);

boardRouter.delete('/remove/:id', deleteBaard);
boardRouter.delete('/column/remove/:id', deleteColumn);
boardRouter.delete('/card/remove/:id', deleteCard);

export default boardRouter;
