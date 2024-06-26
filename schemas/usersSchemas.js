import Joi from 'joi';

export const createUserSchema = Joi.object({
  name: Joi.string().required().trim().min(3).max(16),
  email: Joi.string().email().required().lowercase().trim(),
  password: Joi.string().min(3).max(16).required(),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().trim().min(3).max(16),
  email: Joi.string().email().lowercase().trim(),
  password: Joi.string().min(3).max(16),
}).min(1);

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required().lowercase().trim(),
  password: Joi.string().min(3).max(16).required(),
});

export const updateThemeSchema = Joi.object({
  theme: Joi.string().trim().min(1).lowercase().valid('dark', 'light', 'violet').required(),
});

export const needHelpSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().max(64).required(),
  comment: Joi.string().trim().min(3).max(78).required(),
});
