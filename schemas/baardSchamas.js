import Joi from 'joi';

export const createBaardSchema = Joi.object({
  title: Joi.string().trim().min(3).required(),
  icon: Joi.string().trim().optional(),
  background: Joi.string().trim().optional(),
});
