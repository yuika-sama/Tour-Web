const express = require('express');
const router = express.Router();
const { createBooking, getBookingById, getAllBookings, updateBooking, deleteBooking, getBookingsByUserId } = require('../controllers/bookings.controller');

// GET routes
router.get('/', getAllBookings);
router.get('/user/:user_id', getBookingsByUserId);
router.get('/:booking_id', getBookingById);

// POST route
router.post('/', createBooking);

// PUT route
router.put('/:booking_id', updateBooking);

// DELETE route
router.delete('/:booking_id', deleteBooking);


module.exports = router;
