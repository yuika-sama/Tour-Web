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
        const { booking_id, payment_method, amount, status, transaction_id, payment_date } = paymentData;
        const created_at = new Date();
        const updated_at = new Date();
        if (!paymentData.payment_method) {
            paymentData.payment_method = 'cash';
        }
        if (!paymentData.status) {
            paymentData.status = 'pending';
        }
        if (!paymentData.transaction_id) {
            paymentData.transaction_id = '0';
        }
        const query = `INSERT INTO payments (booking_id, payment_method, amount, status, transaction_id, payment_date, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const [result] = await pool.query(query, [booking_id, payment_method, amount, status, transaction_id, payment_date, created_at, updated_at]);
        return result;
    },
    getPaymentById: async (paymentId) => {
        const query = `SELECT * FROM payments WHERE payment_id = ?`;
        const [result] = await pool.query(query, [paymentId]);
        return result[0];
    },
    updatePayment: async (paymentId, paymentData) => {
        const { booking_id, payment_method, amount, status, transaction_id, payment_date } = paymentData; 
        const updated_at = new Date();
        const query = `UPDATE payments SET booking_id = ?, payment_method = ?, amount = ?, status = ?, transaction_id = ?, payment_date = ?, updated_at = ? WHERE payment_id = ?`;
        const [result] = await pool.query(query, [booking_id, payment_method, amount, status, transaction_id, payment_date, updated_at, paymentId]);
        return result[0];
    },
    deletePayment: async (paymentId) => {
        const query = `DELETE FROM payments WHERE payment_id = ?`;
        const [result] = await pool.query(query, [paymentId]);
        return result[0];
    },
    getAllPayments: async () => {
        const query = `SELECT * FROM payments`;
        const result = await pool.query(query);
        return result[0];
    },
    findByBookingId: async (bookingId) => { 
        const query = `SELECT * FROM payments WHERE booking_id = ?`;
        const [result] = await pool.query(query, [bookingId]);
        return result[0];
    },
    findByPaymentMethod: async (paymentMethod) => {
        const query = `SELECT * FROM payments WHERE payment_method = ?`;
        const result = await pool.query(query, [paymentMethod]);
        return result[0];
    },
    findByTransactionId: async (transactionId) => {
        const query = `SELECT * FROM payments WHERE transaction_id = ?`;
        const [result] = await pool.query(query, [transactionId]);
        return result[0];
    },
    findByStatus: async (status) => {
        const query = `SELECT * FROM payments WHERE status = ?`;
        const result = await pool.query(query, [status]);
        return result[0];
    }
};
