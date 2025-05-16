const pool = require('../config/db');

const Payment = {
    payment_id: {
        type: Number,
        autoIncrement: true,
        primaryKey: true
    },
    booking_id: {
        type: Number,
        allowNull: false
    },
    payment_method: {
        type: String,
        allowNull: false
    },
    amount: {
        type: Number,
        allowNull: false
    },
    status: {
        type: String, // ENUM: 'pending', 'successful', 'failed'
        allowNull: false
    },
    transaction_id: {
        type: String,
        allowNull: false
    },
    payment_date: {
        type: Date,
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
    createPayment: async (paymentData) => {
        const [result] = await pool.query('INSERT INTO payments (user_id, tour_id, amount, status) VALUES (?, ?, ?, ?)', [paymentData.user_id, paymentData.tour_id, paymentData.amount, paymentData.status]);
        return result.insertId;
    },
    getPaymentById: async (paymentId) => {
        const [result] = await pool.query('SELECT * FROM payments WHERE payment_id = ?', [paymentId]);
        return result[0];
    },
    updatePayment: async (paymentId, paymentData) => {
        const [result] = await pool.query('UPDATE payments SET user_id = ?, tour_id = ?, amount = ?, status = ? WHERE payment_id = ?', [paymentData.user_id, paymentData.tour_id, paymentData.amount, paymentData.status, paymentId]);
        return result.affectedRows;
    },  
    deletePayment: async (paymentId) => {           
        const [result] = await pool.query('DELETE FROM payments WHERE payment_id = ?', [paymentId]);
        return result.affectedRows;
    },
    getAllPayments: async () => {
        const [result] = await pool.query('SELECT * FROM payments');
        return result;
    },
    findByBookingId: async (bookingId) => {
        const [result] = await pool.query('SELECT * FROM payments WHERE booking_id = ?', [bookingId]);
        return result[0];
    },
    findByPaymentMethod: async (paymentMethod) => {
        const [result] = await pool.query('SELECT * FROM payments WHERE payment_method = ?', [paymentMethod]);
        return result;
    },
    findByTransactionId: async (transactionId) => {
        const [result] = await pool.query('SELECT * FROM payments WHERE transaction_id = ?', [transactionId]);
        return result[0];
    },
    findByStatus: async (status) => {
        const [result] = await pool.query('SELECT * FROM payments WHERE status = ?', [status]);
        return result;
    }
};
