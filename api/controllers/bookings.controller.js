const Booking = require('../models/bookings.model');

const createBooking = async (req, res) => {
    const booking = req.body;
    if (!booking.user_id || !booking.tour_id || !booking.booking_date || !booking.travel_date || !booking.num_travelers || !booking.customer_name || !booking.total_price || !booking.status) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const newBooking = await Booking.createBooking(booking);
    res.status(201).json(newBooking);
};

const getBookingById = async (req, res) => {
    const booking_id = req.params.booking_id;
    const booking = await Booking.getBookingById(booking_id);
    res.status(200).json(booking);
};

const getAllBookings = async (req, res) => {
    const bookings = await Booking.getAllBookings();
    res.status(200).json(bookings);
};

const updateBooking = async (req, res) => {
    const booking_id = req.params.booking_id;
    const booking = req.body;
    const updatedBooking = await Booking.updateBooking(booking_id, booking);
    res.status(200).json(updatedBooking);
};

const deleteBooking = async (req, res) => {
    const booking_id = req.params.booking_id;
    const deletedBooking = await Booking.deleteBooking(booking_id);
    res.status(200).json(deletedBooking);
};

const getBookingsByUserId = async (req, res) => {
    const user_id = req.params.user_id;
    const bookings = await Booking.getBookingsByUserId(user_id);
    res.status(200).json(bookings);
};

module.exports = {
    createBooking,
    getBookingById,
    getAllBookings,
    updateBooking,
    deleteBooking,
    getBookingsByUserId
};

