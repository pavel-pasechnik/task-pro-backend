import Joi from 'joi';

const startDate = new Date('01/01/2024');

const unixDay = 86400000;

// bard
export const createBaardSchema = Joi.object({
  title: Joi.string().trim().min(3).required(),
  icon: Joi.string().trim().optional(),
  background: Joi.string().trim().optional(),
});

export const updateBaardSchema = Joi.object({
  title: Joi.string().trim().min(3).optional(),
  icon: Joi.string().trim().optional(),
  background: Joi.string().trim().optional(),
}).min(1);

// column
export const createColumnSchema = Joi.object({
  title: Joi.string().trim().min(3).required(),
});

export const updateColumnSchema = Joi.object({
  title: Joi.string().trim().min(3),
});

export const createCardSchema = Joi.object({
  title: Joi.string().trim().min(3).required(),
  description: Joi.string().trim().min(3).required(),
  priority: Joi.string().trim().required(),
  deadline: Joi.number()
    .min(+startDate)
    .max(Date.now() + unixDay)
    .required(),
});

export const updateCardSchema = Joi.object({
  title: Joi.string().trim().min(3).optional(),
  description: Joi.string().trim().min(3).optional(),
  priority: Joi.string().trim().optional(),
  deadline: Joi.number()
    .min(+startDate)
    .max(Date.now() + unixDay)
    .optional(),
});
