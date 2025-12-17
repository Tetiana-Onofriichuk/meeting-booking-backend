import { Booking } from '../models/Booking.js';
import { User } from '../models/User.js';
import mongoose from 'mongoose';

const hasTimeConflict = async ({ businessId, startAt, endAt, excludeId }) => {
  const query = {
    businessId,
    status: 'active',
    startAt: { $lt: endAt },
    endAt: { $gt: startAt },
  };

  if (excludeId) {
    query._id = { $ne: excludeId };
  }

  const conflict = await Booking.findOne(query);
  return Boolean(conflict);
};

export const createBooking = async (req, res, next) => {
  try {
    const { clientId, businessId, startAt, endAt, notes } = req.body;

    const client = await User.findById(clientId);
    const business = await User.findById(businessId);

    if (!client || client.role !== 'client') {
      return res.status(400).json({ message: 'Invalid clientId' });
    }

    if (!business || business.role !== 'business') {
      return res.status(400).json({ message: 'Invalid businessId' });
    }

    const conflict = await hasTimeConflict({
      businessId,
      startAt,
      endAt,
    });

    if (conflict) {
      return res.status(409).json({ message: 'Time slot already booked' });
    }

    const booking = await Booking.create({
      clientId,
      businessId,
      startAt,
      endAt,
      notes,
      status: 'active',
    });

    res.status(201).json(booking);
  } catch (error) {
    next(error);
  }
};

export const getBookings = async (req, res, next) => {
  try {
    const { clientId, businessId } = req.query;

    const filter = {};
    if (clientId) filter.clientId = clientId;
    if (businessId) filter.businessId = businessId;

    const bookings = await Booking.find(filter)
      .populate('clientId', 'name email role')
      .populate('businessId', 'name email role')
      .sort({ startAt: 1 });

    res.json(bookings);
  } catch (error) {
    next(error);
  }
};

export const updateBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { startAt, endAt, notes } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid booking id' });
    }

    const booking = await Booking.findById(id);
    if (!booking || booking.status === 'canceled') {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const conflict = await hasTimeConflict({
      businessId: booking.businessId,
      startAt,
      endAt,
      excludeId: booking._id,
    });

    if (conflict) {
      return res.status(409).json({ message: 'Time slot already booked' });
    }

    booking.startAt = startAt;
    booking.endAt = endAt;
    if (notes !== undefined) booking.notes = notes;

    await booking.save();

    res.json(booking);
  } catch (error) {
    next(error);
  }
};

export const cancelBooking = async (req, res, next) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.status = 'canceled';
    await booking.save();

    res.json({ message: 'Booking canceled successfully' });
  } catch (error) {
    next(error);
  }
};
