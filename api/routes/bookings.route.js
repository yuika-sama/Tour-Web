const express = require('express');
const router = express.Router();
const {
    createBooking,
    getBookingById,
    updateBooking,
    deleteBooking,
    getAllBookings,
    getBookingsByUserId,
    getBookingsByTourId,
    getBookingsByBookingDate,
    getBookingsByTravelDate,
    getBookingsByCustomerName,
    getBookingsByTotalPrice,
    getBookingsByStatus
} = require('../controllers/bookings.controller');

router.post('/', createBooking);
router.get('/:booking_id', getBookingById);
router.put('/:booking_id', updateBooking);
router.delete('/:booking_id', deleteBooking);
router.get('/', getAllBookings);
router.get('/user/:user_id', getBookingsByUserId);
router.get('/tour/:tour_id', getBookingsByTourId);
router.get('/booking_date/:booking_date', getBookingsByBookingDate);
router.get('/travel_date/:travel_date', getBookingsByTravelDate);
router.get('/customer_name/:customer_name', getBookingsByCustomerName);
router.get('/total_price/:total_price', getBookingsByTotalPrice);
router.get('/status/:status', getBookingsByStatus);

module.exports = router;
