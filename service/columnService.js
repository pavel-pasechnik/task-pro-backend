import Column from '../models/column.js';

export const createColumnService = async ({ title, baardId }) =>
  Column.create({
    title,
    owner: baardId,
  });

export const updateColumnService = async (data, body) =>
  Column.findByIdAndUpdate(data, body, { new: true });

export const deleteColumnService = data => Column.findByIdAndDelete(data);

export const getAllColumnService = async baardId => Column.find({ owner: baardId });
