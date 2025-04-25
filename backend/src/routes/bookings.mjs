import { Router } from 'express';
import Booking from '../models/Booking.mjs';
import passport from 'passport';

const router = Router();

// Middleware to restrict to admins
const isAdmin = (req, res, next) => req.isAuthenticated() ? next() : res.status(401).json({ error: 'Unauthorized' });

router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().sort('date');
    res.json(bookings);
  } catch (err) {
    console.error('Bookings fetch error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', isAdmin, async (req, res) => {
  try {
    const { date, status } = req.body;
    const booking = await Booking.findOneAndUpdate(
      { date },
      { date, status },
      { upsert: true, new: true }
    );
    res.status(201).json(booking);
  } catch (err) {
    console.error('Booking update error:', err);
    res.status(500).json({ error: 'Failed to set date' });
  }
});

export default router;
