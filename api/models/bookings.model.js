const pool = require('../config/db');

const Booking = {
    booking_id: {
        type: Number,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: Number,
        allowNull: false
    },
    tour_id: {
        type: Number,
        allowNull: false
    },
    booking_date: {
        type: Date,
        allowNull: false
    },
    travel_date: {
        type: Date,
        allowNull: false
    },
    num_travelers: {
        type: Number,
        allowNull: false
    },
    customer_name: {
        type: String,
        allowNull: false
    },
    total_price: {
        type: Number,
        allowNull: false
    },
    status: {
        type: String, // ENUM: 'pending', 'confirmed', 'cancelled', 'completed'
        allowNull: false
    },
    created_at: {
        type: Date,
        allowNull: false,
        defaultValue: Date.now
    },
    updated_at: {
        type: Date,
        allowNull: false,
        defaultValue: Date.now
    }
};


module.exports = {
    createBooking: async (booking) => { 
        const [result] = await pool.query('INSERT INTO bookings (tour_id, user_id, booking_date, travel_date, num_travelers, customer_name, total_price, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [booking.tour_id, booking.user_id, booking.booking_date, booking.travel_date, booking.num_travelers, booking.customer_name, booking.total_price, booking.status]);
        return result.insertId;
    },
    getBookingById: async (booking_id) => {
        const [result] = await pool.query('SELECT * FROM bookings WHERE booking_id = ?', [booking_id]);
        return result[0];
    },
    updateBooking: async (booking_id, booking) => {
        const [result] = await pool.query('UPDATE bookings SET tour_id = ?, user_id = ?, booking_date = ?, travel_date = ?, num_travelers = ?, customer_name = ?, total_price = ?, status = ? WHERE booking_id = ?', [booking.tour_id, booking.user_id, booking.booking_date, booking.travel_date, booking.num_travelers, booking.customer_name, booking.total_price, booking.status, booking_id]);
        return result.affectedRows;
    },
    deleteBooking: async (booking_id) => {
        const [result] = await pool.query('DELETE FROM bookings WHERE booking_id = ?', [booking_id]);
        return result.affectedRows;
    },
    getAllBookings: async () => {
        const [result] = await pool.query('SELECT * FROM bookings');
        return result;
    },
    getBookingsByUserId: async (user_id) => {
        const [result] = await pool.query('SELECT * FROM bookings WHERE user_id = ?', [user_id]);
        return result;
    },
    getBookingsByTourId: async (tour_id) => {
        const [result] = await pool.query('SELECT * FROM bookings WHERE tour_id = ?', [tour_id]);
        return result;
    },
    getBookingsByBookingDate: async (booking_date) => {
        const [result] = await pool.query('SELECT * FROM bookings WHERE booking_date = ?', [booking_date]);
        return result;
    },
    getBookingsByTravelDate: async (travel_date) => {
        const [result] = await pool.query('SELECT * FROM bookings WHERE travel_date = ?', [travel_date]);
        return result;
    },
    getBookingsByCustomerName: async (customer_name) => {
        const [result] = await pool.query('SELECT * FROM bookings WHERE customer_name = ?', [customer_name]);
        return result;
    },
    getBookingsByTotalPrice: async (total_price) => {
        const [result] = await pool.query('SELECT * FROM bookings WHERE total_price = ?', [total_price]);
        return result;
    },
    getBookingsByStatus: async (status) => {
        const [result] = await pool.query('SELECT * FROM bookings WHERE status = ?', [status]);
        return result;
    }
};


