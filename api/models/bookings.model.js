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
    createBooking: async(booking) => {
        try {
            const { user_id, tour_id, booking_date, travel_date, num_travelers, customer_name, total_price, status } = booking;
            booking.created_at = new Date();
            booking.updated_at = new Date();
            const query = `INSERT INTO bookings (user_id, tour_id, booking_date, travel_date, num_travelers, customer_name, total_price, status, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;
            const result = await pool.query(query, [user_id, tour_id, booking_date, travel_date, num_travelers, customer_name, total_price, status, booking.created_at, booking.updated_at]);
            return result.rows[0];
        } catch (error) {
            console.error('Error creating booking:', error);
            throw new Error('Failed to create booking');
        }
    },
    getBookingById: async(booking_id) => {
        try {
            const query = `SELECT * FROM bookings WHERE booking_id = $1`;
            const result = await pool.query(query, [booking_id]);
            return result.rows[0];
        } catch (error) {
            console.error('Error getting booking by id:', error);
            throw new Error('Failed to get booking by id');
        }
    },
    getAllBookings: async() => {
        try {
            const query = `SELECT * FROM bookings`;
            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            console.error('Error getting all bookings:', error);
            throw new Error('Failed to get all bookings');
        }
    },
    updateBooking: async(booking_id, booking) => {
        try {
            const { user_id, tour_id, booking_date, travel_date, num_travelers, customer_name, total_price, status } = booking;
            booking.updated_at = new Date();
            const query = `UPDATE bookings SET user_id = $1, tour_id = $2, booking_date = $3, travel_date = $4, num_travelers = $5, customer_name = $6, total_price = $7, status = $8, updated_at = $9 WHERE booking_id = $10`;
            const result = await pool.query(query, [user_id, tour_id, booking_date, travel_date, num_travelers, customer_name, total_price, status, booking.updated_at, booking_id]);
            return result.rows[0];
        } catch (error) {
            console.error('Error updating booking:', error);
            throw new Error('Failed to update booking');
        }
    },
    deleteBooking: async(booking_id) => {
        try {
            const query = `DELETE FROM bookings WHERE booking_id = $1`;
            const result = await pool.query(query, [booking_id]);
            return result.rows[0];
        } catch (error) {
            console.error('Error deleting booking:', error);
            throw new Error('Failed to delete booking');
        }
    },
    getBookingsByUserId: async(user_id) => {
        try {
            const query = `SELECT * FROM bookings WHERE user_id = $1`;
            const result = await pool.query(query, [user_id]);
            return result.rows;
        } catch (error) {
            console.error('Error getting bookings by user id:', error);
            throw new Error('Failed to get bookings by user id');
        }
    }
}