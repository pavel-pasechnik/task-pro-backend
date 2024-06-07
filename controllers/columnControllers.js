import asyncHandler from 'express-async-handler';

import HttpError from '../helpers/HttpError.js';
import {
  createColumnService,
  deleteColumnService,
  updateColumnService,
} from '../service/columnService.js';

export const createColumn = asyncHandler(async (req, res, next) => {
  const { id: baardId } = req.params;
  const { title } = req.body;

  const column = await createColumnService({ baardId, title });
  if (!column) throw new HttpError(404, 'frong id');

  res.status(200).json(column);
});

export const updateColumn = asyncHandler(async (req, res, next) => {
  const { id: baardId } = req.params;

  const result = await updateColumnService({ _id: baardId }, req.body);

  if (!result) throw new HttpError(404);

  res.status(200).json(result);
});

export const deleteColumn = asyncHandler(async (req, res) => {
  const { id: baardId } = req.params;

  const result = await deleteColumnService({ _id: baardId });

  if (!result) throw new HttpError(404);

  res.status(200).json(result);
});
