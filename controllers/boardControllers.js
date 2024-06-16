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

  const response = {
    id: baard._id,
    title: baard.title,
    icon: baard.icon,
    background: baard.background,
    owner: baard.owner,
  };

  res.status(201).json(response);
});

export const updateBoard = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const baard = await updateBoardService({ _id: id, owner }, req.body);

  if (!baard) throw new HttpErrorBoard(404);

  const response = {
    id: baard._id,
    title: baard.title,
    icon: baard.icon,
    background: baard.background,
    owner: baard.owner,
  };
  res.status(200).json(response);
});

export const deleteBoard = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const baard = await deleteBoardService({ _id: id, owner });

  if (!baard) throw new HttpErrorBoard(404);
  const response = {
    id: baard._id,
    title: baard.title,
    icon: baard.icon,
    background: baard.background,
    owner: baard.owner,
  };

  res.status(200).json(response);
});

export const getAllBoard = asyncHandler(async (req, res) => {
  const result = await getAllBoardService(req.user);

  res.status(200).json(result);
});
