import Joi from 'joi';

const message = 'Помилка від Joi або іншої бібліотеки валідації';

export const createUserSchema = Joi.object({
  name: Joi.string().required().trim().min(3).max(16),
  email: Joi.string().email().required().lowercase().trim(),
  password: Joi.string().min(3).max(16).required(),
}).error(errors => {
  return new Error(message);
});

export const updateUserSchema = Joi.object({
  name: Joi.string().trim().min(3).max(16),
  email: Joi.string().email().lowercase().trim(),
  password: Joi.string().min(3).max(16),
})
  .min(1)
  .error(errors => {
    return new Error(message);
  });

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required().lowercase().trim(),
  password: Joi.string().min(3).max(16).required(),
}).error(errors => {
  return new Error(message);
});

export const updateThemeSchema = Joi.object({
  theme: Joi.string().trim().min(1).required(),
}).error(errors => {
  return new Error(message);
});
