const express = require('express');
const router = express.Router();
const { createPayment, getPaymentById, updatePayment, deletePayment, getAllPayments, findByBookingId, findByPaymentMethod, findByTransactionId, findByStatus } = require('../controllers/payments.controller');

router.post('/', createPayment);

router.get('/:paymentId', getPaymentById);

router.put('/:paymentId', updatePayment);

router.delete('/:paymentId', deletePayment);

router.get('/', getAllPayments);

router.get('/booking/:bookingId', findByBookingId);

router.get('/paymentMethod/:paymentMethod', findByPaymentMethod);

router.get('/transactionId/:transactionId', findByTransactionId);

router.get('/status/:status', findByStatus);

module.exports = router;