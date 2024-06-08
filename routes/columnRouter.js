import express from 'express';

import { createColumn, deleteColumn, updateColumn } from '../controllers/columnControllers.js';
import validateBody from '../helpers/validateBody.js';
import authMiddleware from '../middleware/auth.js';

const columnRouter = express.Router();

columnRouter.use(authMiddleware);
columnRouter.post('/add/:id', createColumn);
columnRouter.put('/edit/:id', updateColumn);
columnRouter.delete('/remove/:id', deleteColumn);

export default columnRouter;
