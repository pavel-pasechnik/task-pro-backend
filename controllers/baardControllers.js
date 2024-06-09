import asyncHandler from 'express-async-handler';

import HttpError from '../helpers/HttpError.js';
import {
  createBaardService,
  deleteBaardService,
  updateBaardService,
} from '../service/baardService.js';

export const createBaard = asyncHandler(async (req, res, next) => {
  const baard = await createBaardService(req.body, req.user);

  res.status(200).json(baard);
});

export const updateBaard = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const result = await updateBaardService({ _id: id, owner }, req.body);

  if (!result) throw new HttpError(404, 'Board not found');

  res.status(200).json(result);
});

export const deleteBaard = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const result = await deleteBaardService({ _id: id, owner });

  if (!result) throw new HttpError(404, 'Board not found');

  res.status(200).json(result);
});
