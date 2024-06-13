import Joi from 'joi';

export const needHelpSchema = Joi.object({
  email: Joi.string().trim().email().max(64).required(),
  comment: Joi.string().trim().min(3).max(78).required(),
});
