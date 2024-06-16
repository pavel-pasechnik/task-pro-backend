import Card from '../models/card.js';

export const createCardService = async ({ title, description, priority, deadline, columnID }) =>
  Card.create({ title, description, priority, deadline, owner: columnID });

export const updateCardService = async (data, body) =>
  Card.findByIdAndUpdate(data, body, { new: true });

export const deleteCardService = data => Card.findByIdAndDelete(data);

export const getAllCardService = async columnID => Card.find({ owner: columnID });
