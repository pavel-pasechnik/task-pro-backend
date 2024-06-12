import asyncHandler from 'express-async-handler';

import { HttpErrorBoard } from '../helpers/HttpError.js';
import {
  createBoardService,
  deleteBoardService,
  getAllBoardService,
  updateBoardService,
} from '../service/boardService.js';

export const createBoard = asyncHandler(async (req, res, next) => {
  const baard = await createBoardService(req.body, req.user);

  res.status(200).json(baard);
});

export const updateBoard = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const result = await updateBoardService({ _id: id, owner }, req.body);

  if (!result) throw new HttpErrorBoard(404);

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: 'Body must have at least one field' });
  }
  res.status(200).json(result);
});

export const deleteBoard = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const result = await deleteBoardService({ _id: id, owner });

  if (!result) throw new HttpErrorBoard(404);

  res.status(200).json(result);
});

export const getAllBoard = asyncHandler(async (req, res) => {
  const result = await getAllBoardService(req.user);

  res.status(200).json(result);
});
