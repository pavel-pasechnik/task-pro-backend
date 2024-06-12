// import { cloudinaryService } from './cloudinaryService.js';
import Board from '../models/board.js';

export const createBoardService = async ({ title, icon, background }, owner) =>
  Board.create({
    title,
    icon,
    background,
    owner: owner._id,
  });

export const updateBoardService = async (data, body) =>
  Board.findByIdAndUpdate(data, body, { new: true });

export const deleteBoardService = data => Board.findByIdAndDelete(data);

export const getAllBoardService = async owner => Board.find({ owner: owner._id });
