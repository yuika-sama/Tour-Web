const Booking = require('../models/bookings.model');

const createBooking = async (req, res) => {
    const booking = req.body;
    const newBooking = await Booking.createBooking(booking);
    res.status(201).json(newBooking);
}

const getBookingById = async (req, res) => {
    const { booking_id } = req.params;
    const booking = await Booking.getBookingById(booking_id);
    res.status(200).json(booking);
}

const updateBooking = async (req, res) => {
    const { booking_id } = req.params;
    const booking = req.body;
    const updatedBooking = await Booking.updateBooking(booking_id, booking);
    res.status(200).json(updatedBooking);
}

const deleteBooking = async (req, res) => {
    const { booking_id } = req.params;
    const deletedBooking = await Booking.deleteBooking(booking_id);
    res.status(200).json(deletedBooking);
}

const getAllBookings = async (req, res) => {
    const bookings = await Booking.getAllBookings();
    res.status(200).json(bookings);
}

const getBookingsByUserId = async (req, res) => {
    const { user_id } = req.params;
    const bookings = await Booking.getBookingsByUserId(user_id);
    res.status(200).json(bookings);
}

const getBookingsByTourId = async (req, res) => {
    const { tour_id } = req.params;
    const bookings = await Booking.getBookingsByTourId(tour_id);
    res.status(200).json(bookings);
}

const getBookingsByBookingDate = async (req, res) => {
    const { booking_date } = req.params;
    const bookings = await Booking.getBookingsByBookingDate(booking_date);
    res.status(200).json(bookings);
}

const getBookingsByTravelDate = async (req, res) => {
    const { travel_date } = req.params;
    const bookings = await Booking.getBookingsByTravelDate(travel_date);
    res.status(200).json(bookings);
}

const getBookingsByCustomerName = async (req, res) => {
    const { customer_name } = req.params;
    const bookings = await Booking.getBookingsByCustomerName(customer_name);
    res.status(200).json(bookings);
}

const getBookingsByTotalPrice = async (req, res) => {
    const { total_price } = req.params;
    const bookings = await Booking.getBookingsByTotalPrice(total_price);
    res.status(200).json(bookings);
}

const getBookingsByStatus = async (req, res) => {
    const { status } = req.params;
    const bookings = await Booking.getBookingsByStatus(status);
    res.status(200).json(bookings);
}

module.exports = {
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
}