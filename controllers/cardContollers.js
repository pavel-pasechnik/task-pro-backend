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

  const response = {
    id: card._id,
    title: card.title,
    description: card.description,
    labelcolor: card.labelcolor,
    deadline: card.deadline,
    owner: card.owner,
  };

  res.status(201).json(response);
});

export const updateCard = asyncHandler(async (req, res, next) => {
  const { id: columnID } = req.params;

  const card = await updateCardService({ _id: columnID }, req.body);
  if (!card) throw new HttpErrorBoard(404);

  const response = {
    id: card._id,
    title: card.title,
    description: card.description,
    labelcolor: card.labelcolor,
    deadline: card.deadline,
    owner: card.owner,
  };
  res.status(200).json(response);
});

export const deleteCard = asyncHandler(async (req, res, next) => {
  const { id: columnID } = req.params;

  const card = await deleteCardService({ _id: columnID });

  if (!card) throw new HttpErrorBoard(404);
  const response = {
    id: card._id,
    title: card.title,
    description: card.description,
    labelcolor: card.labelcolor,
    deadline: card.deadline,
    owner: card.owner,
  };

  res.status(200).json(response);
});

export const getAllCard = asyncHandler(async (req, res, next) => {
  const { id: columnID } = req.params;
  const result = await getAllCardService({ _id: columnID });
  if (!result || result.length === 0) {
    throw new HttpErrorBoard(404);
  }
  res.status(200).json(result);
});
