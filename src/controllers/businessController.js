import { User } from '../models/User.js';

export const getAllBusinesses = async (req, res, next) => {
  try {
    const businesses = await User.find({ role: 'business' }).select('-passwordHash').sort({ createdAt: -1 });

    res.json(businesses);
  } catch (error) {
    next(error);
  }
};
