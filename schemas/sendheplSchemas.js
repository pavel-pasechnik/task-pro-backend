import Joi from 'joi';

export const sendHelpSchema = Joi.object({
  email: Joi.string().trim().email().max(64).required(),
  comment: Joi.string().trim().min(3).max(78).required(),
});
