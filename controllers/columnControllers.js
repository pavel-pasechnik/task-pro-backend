import asyncHandler from 'express-async-handler';

import { HttpErrorBoard } from '../helpers/HttpError.js';
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

  const response = {
    id: column._id,
    title: column.title,
    owner: column.owner,
  };

  res.status(201).json(response);
});

export const updateColumn = asyncHandler(async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: 'Body must have at least one field' });
  }

  const { id: baardId } = req.params;

  const column = await updateColumnService({ _id: baardId }, req.body);

  if (!column) throw new HttpErrorBoard(404);
  const response = {
    id: column._id,
    title: column.title,
    owner: column.owner,
  };
  res.status(200).json(response);
});

export const deleteColumn = asyncHandler(async (req, res, next) => {
  const { id: baardId } = req.params;

  const column = await deleteColumnService({ _id: baardId });

  if (!column) throw new HttpErrorBoard(404);

  const response = {
    id: column._id,
    title: column.title,
    owner: column.owner,
  };
  res.status(200).json(response);
});

export const getAllColumns = asyncHandler(async (req, res, next) => {
  const { id: baardId } = req.params;
  const result = await getAllColumnService({ _id: baardId });
  if (!result || result.length === 0) {
    throw new HttpErrorBoard(404);
  }

  res.status(200).json(result);
});
