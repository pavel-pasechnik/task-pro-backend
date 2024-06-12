import asyncHandler from 'express-async-handler';

import { HttpErrorBoard } from '../helpers/HttpError.js';
import {
  createCardService,
  deleteCardService,
  getAllCardService,
  updateCardService,
} from '../service/cardService.js';

export const createCard = asyncHandler(async (req, res, next) => {
  const { id: columnID } = req.params;
  const { title, description, labelcolor, deadline } = req.body;

  const card = await createCardService({ title, description, labelcolor, deadline, columnID });
  res.status(201).json(card);
});

export const updateCard = asyncHandler(async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: 'Body must have at least one field' });
  }
  const { id: columnID } = req.params;

  const result = await updateCardService({ _id: columnID }, req.body);
  if (!result) throw new HttpErrorBoard(404);

  res.status(200).json(result);
});

export const deleteCard = asyncHandler(async (req, res, next) => {
  const { id: columnID } = req.params;

  const result = await deleteCardService({ _id: columnID });

  if (!result) throw new HttpErrorBoard(404);

  res.status(200).json(result);
});

export const getAllCard = asyncHandler(async (req, res, next) => {
  const { id: columnID } = req.params;
  const result = await getAllCardService({ _id: columnID });
  if (!result || result.length === 0) {
    throw new HttpErrorBoard(404);
  }
  res.status(200).json(result);
});
