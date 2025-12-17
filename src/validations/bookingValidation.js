import { Joi, Segments } from 'celebrate';

export const bookingIdSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().hex().length(24).required(),
  }),
};

export const createBookingSchema = {
  [Segments.BODY]: Joi.object({
    clientId: Joi.string().hex().length(24).required(),
    businessId: Joi.string().hex().length(24).required(),
    startAt: Joi.date().iso().required(),
    endAt: Joi.date().iso().greater(Joi.ref('startAt')).required(),
    notes: Joi.string().allow('', null),
  }),
};

export const updateBookingSchema = {
  [Segments.BODY]: Joi.object({
    startAt: Joi.date().iso().required(),
    endAt: Joi.date().iso().greater(Joi.ref('startAt')).required(),
    notes: Joi.string().allow('', null),
  }),
};
