import Joi from 'joi';

const message = 'Помилка від Joi або іншої бібліотеки валідації';

export const createUserSchema = Joi.object({
  email: Joi.string().email().required().lowercase().trim(),
  password: Joi.string()
    .pattern(new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{4,}$`))
    .required(),
}).error(errors => {
  return new Error(message);
});

export const updateUserSchema = Joi.object({
  email: Joi.string().email().lowercase().trim(),
  password: Joi.string().pattern(
    new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{4,}$`)
  ),
})
  .min(1)
  .error(errors => {
    return new Error(message);
  });

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required().lowercase().trim(),
  password: Joi.string()
    .pattern(new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{4,}$`))
    .required(),
}).error(errors => {
  return new Error(message);
});

export const updateUserSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business'),
}).error(errors => {
  return new Error(message);
});

export const verifyCheckSchema = Joi.object({
  email: Joi.string().email().lowercase().trim().required().messages({
    'any.required': 'missing required field email',
    'string.email': 'Помилка від Joi або іншої бібліотеки валідації',
  }),
});
