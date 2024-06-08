import asyncHandler from 'express-async-handler';

import HttpError from '../helpers/HttpError.js';
import { createCardService, deleteCardService, updateCardService } from '../service/cardService.js';

export const createCard = asyncHandler(async (req, res, next) => {
  const { id: columnID } = req.params;
  const { title, description, labelcolor, deadline } = req.body;

  const card = await createCardService({ title, description, labelcolor, deadline, columnID });
  res.status(200).json(card);
});

export const updateCard = asyncHandler(async (req, res, next) => {
  const { id: columnID } = req.params;

  const result = await updateCardService({ _id: columnID }, req.body);
  if (!result) throw new HttpError(404);
  res.status(200).json(result);
});

export const deleteCard = asyncHandler(async (req, res, next) => {
  const { id: columnID } = req.params;

  const result = await deleteCardService({ _id: columnID });

  if (!result) throw new HttpError(404);

  res.status(200).json(result);
});
