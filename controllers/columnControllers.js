import asyncHandler from 'express-async-handler';

import { HttpErrorBoard } from '../helpers/HttpError.js';
import Column from '../models/column.js';
import {
  createColumnService,
  deleteColumnService,
  getAllColumnService,
  updateColumnService,
} from '../service/columnService.js';

export const createColumn = asyncHandler(async (req, res, next) => {
  const { id: baardId } = req.params;
  const { title } = req.body;

  const column = await createColumnService({ baardId, title });

  res.status(201).json(column);
});

export const updateColumn = asyncHandler(async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: 'Body must have at least one field' });
  }

  const { id: baardId } = req.params;

  const result = await updateColumnService({ _id: baardId }, req.body);

  if (!result) throw new HttpErrorBoard(404);

  res.status(200).json(result);
});

export const deleteColumn = asyncHandler(async (req, res, next) => {
  const { id: baardId } = req.params;

  const result = await deleteColumnService({ _id: baardId });

  if (!result) throw new HttpErrorBoard(404);

  res.status(200).json(result);
});

export const getAllColumns = asyncHandler(async (req, res, next) => {
  const { id: baardId } = req.params;
  const result = await getAllColumnService({ _id: baardId });
  if (!result || result.length === 0) {
    throw new HttpErrorBoard(404);
  }

  res.status(200).json(result);
});
