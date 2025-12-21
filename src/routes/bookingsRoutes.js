import { Router } from 'express';
import { celebrate } from 'celebrate';

import {
  createBooking,
  getBookings,
  updateBooking,
  cancelBooking,
  deleteBooking,
} from '../controllers/bookingController.js';

import { createBookingSchema, bookingIdSchema, updateBookingSchema } from '../validations/bookingValidation.js';

const router = Router();

router.post('/bookings', celebrate(createBookingSchema, { abortEarly: false }), createBooking);
router.get('/bookings', getBookings);
router.patch(
  '/bookings/:id',
  celebrate(
    {
      ...bookingIdSchema,
      ...updateBookingSchema,
    },
    { abortEarly: false },
  ),
  updateBooking,
);

router.patch('/bookings/:id/cancel', celebrate(bookingIdSchema), cancelBooking);
router.delete('/bookings/:id', celebrate(bookingIdSchema), deleteBooking);

export default router;
