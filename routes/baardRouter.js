import express from 'express';

import { createBaard, deleteBaard, updateBaard } from '../controllers/baardControllers.js';
import validateBody from '../helpers/validateBody.js';
import authMiddleware from '../middleware/auth.js';
import { createBaardSchema } from '../schemas/baardSchamas.js';
const baardRouter = express.Router();

baardRouter.use(authMiddleware);
baardRouter.post('/add', validateBody(createBaardSchema), createBaard);

baardRouter.put('/edit/:id', validateBody(createBaardSchema), updateBaard);

baardRouter.delete('/remove/:id', deleteBaard);

export default baardRouter;
