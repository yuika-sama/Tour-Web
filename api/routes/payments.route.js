const express = require('express');
const router = express.Router();
const { createPayment, getPaymentById, updatePayment, deletePayment, getAllPayments, getPaymentsByBookingId, getPaymentsByPaymentMethod, getPaymentsByTransactionId, getPaymentsByStatus } = require('../controllers/payments.controller');

// GET routes
router.get('/', getAllPayments);
router.get('/booking/:id', getPaymentsByBookingId);
router.get('/payment-method/:paymentMethod', getPaymentsByPaymentMethod);
router.get('/transaction-id/:transactionId', getPaymentsByTransactionId);
router.get('/status/:status', getPaymentsByStatus);
router.get('/:id', getPaymentById);

// POST route
router.post('/', createPayment);

// PUT route
router.put('/:id', updatePayment);

// DELETE route
router.delete('/:id', deletePayment);
module.exports = router;