// import { cloudinaryService } from './cloudinaryService.js';
import Baard from '../models/baard.js';

export const addBaardService = async ({ title, icon, background }, owner) =>
  Baard.create({
    title,
    icon,
    background,
    owner: owner._id,
  });

export const updateBaardService = async (data, body) =>
  await Baard.findByIdAndUpdate(data, body, { new: true });

export const deleteBaardService = data => Baard.findByIdAndDelete(data);
