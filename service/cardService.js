import Card from '../models/card.js';

export const createCardService = async ({ title, description, labelcolor, deadline, columnID }) =>
  Card.create({ title, description, labelcolor, deadline, owner: columnID });

export const updateCardService = async (data, body) =>
  Card.findByIdAndUpdate(data, body, { new: true });

export const deleteCardService = data => Card.findByIdAndDelete(data);
