import { Router } from 'express';
import { celebrate } from 'celebrate';

import { createBooking, getBookings, updateBooking, cancelBooking } from '../controllers/bookingController.js';

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

router.delete('/bookings/:id', celebrate(bookingIdSchema), cancelBooking);

export default router;
