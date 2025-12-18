import { Joi, Segments } from 'celebrate';

export const userIdSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().hex().length(24).required(),
  }),
};

export const createUserSchema = {
  [Segments.BODY]: Joi.object({
    role: Joi.string().valid('client', 'business').required(),
    name: Joi.string().min(2).max(8).required(),
    email: Joi.string().email().required(),
    avatarUrl: Joi.string().uri().optional(),
  }),
};

export const updateUserSchema = {
  [Segments.BODY]: Joi.object({
    role: Joi.string().valid('client', 'business').optional(),
    name: Joi.string().min(2).allow('', null),
    email: Joi.string().email().allow('', null),
  }).min(1),
};
