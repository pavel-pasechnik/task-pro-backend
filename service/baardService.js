// import { cloudinaryService } from './cloudinaryService.js';
import Board from '../models/board.js';

export const createBaardService = async ({ title, icon, background }, owner) =>
  Board.create({
    title,
    icon,
    background,
    owner: owner._id,
  });

export const updateBaardService = async (data, body) =>
  Board.findByIdAndUpdate(data, body, { new: true });

export const deleteBaardService = data => Board.findByIdAndDelete(data);
