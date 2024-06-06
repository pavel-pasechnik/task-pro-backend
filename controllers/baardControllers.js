import asyncHandler from 'express-async-handler';

import HttpError from '../helpers/HttpError.js';
// import Baard from '../model/baard.js';
import {
  addBaardService,
  deleteBaardService,
  updateBaardService,
} from '../service/baardService.js';

export const createBaard = asyncHandler(async (req, res, next) => {
  const baard = await addBaardService(req.body, req.user);

  res.status(200).json(baard);
});

export const updateBaard = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: 'Body must have at least one field' });
  }

  const result = await updateBaardService({ _id: id, owner }, req.body);

  if (!result) throw new HttpError(404);

  res.status(200).json(result);
});

export const deleteBaard = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const result = await deleteBaardService({ _id: id, owner });

  if (!result) throw new HttpError(404);

  res.status(200).json(result);
});
