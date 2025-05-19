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
        const { booking_id, payment_method, amount, status, transaction_id } = paymentData;
        paymentData.created_at = new Date();
        paymentData.updated_at = new Date();
        if (!paymentData.payment_method) {
            paymentData.payment_method = 'cash';
        }
        if (!paymentData.status) {
            paymentData.status = 'pending';
        }
        if (!paymentData.transaction_id) {
            paymentData.transaction_id = '0';
        }
        const query = `INSERT INTO payments (booking_id, payment_method, amount, status, transaction_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
        const result = await pool.query(query, [booking_id, payment_method, amount, status, transaction_id, paymentData.created_at, paymentData.updated_at]);
        return result.rows[0];
    },
    getPaymentById: async (paymentId) => {
        const query = `SELECT * FROM payments WHERE payment_id = $1`;
        const result = await pool.query(query, [paymentId]);
        return result.rows[0];
    },
    updatePayment: async (paymentId, paymentData) => {
        const { booking_id, payment_method, amount, status, transaction_id } = paymentData; 
        paymentData.updated_at = new Date();
        
        const query = `UPDATE payments SET booking_id = $1, payment_method = $2, amount = $3, status = $4, transaction_id = $5, updated_at = $6 WHERE payment_id = $7`;
        const result = await pool.query(query, [booking_id, payment_method, amount, status, transaction_id, paymentData.updated_at, paymentId]);
        return result.rows[0];
    },
    deletePayment: async (paymentId) => {
        const query = `DELETE FROM payments WHERE payment_id = $1`;
        const result = await pool.query(query, [paymentId]);
        return result.rows[0];
    },
    getAllPayments: async () => {
        const query = `SELECT * FROM payments`;
        const result = await pool.query(query);
        return result.rows;
    },
    findByBookingId: async (bookingId) => { 
        const query = `SELECT * FROM payments WHERE booking_id = $1`;
        const result = await pool.query(query, [bookingId]);
        return result.rows;
    },
    findByPaymentMethod: async (paymentMethod) => {
        const query = `SELECT * FROM payments WHERE payment_method = $1`;
        const result = await pool.query(query, [paymentMethod]);
        return result.rows;
    },
    findByTransactionId: async (transactionId) => {
        const query = `SELECT * FROM payments WHERE transaction_id = $1`;
        const result = await pool.query(query, [transactionId]);
        return result.rows;
    },
    findByStatus: async (status) => {
        const query = `SELECT * FROM payments WHERE status = $1`;
        const result = await pool.query(query, [status]);
        return result.rows;
    }
};
