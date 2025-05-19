const express = require('express');
const router = express.Router();
const { createBooking, getBookingById, getAllBookings, updateBooking, deleteBooking, getBookingsByUserId } = require('../controllers/bookings.controller');

router.post('/', createBooking);
router.get('/:booking_id', getBookingById);
router.get('/', getAllBookings);
router.put('/:booking_id', updateBooking);
router.delete('/:booking_id', deleteBooking);
router.get('/user/:user_id', getBookingsByUserId);

module.exports = router;
