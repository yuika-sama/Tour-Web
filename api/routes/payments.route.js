const express = require('express');
const router = express.Router();
const { createPayment, getPaymentById, updatePayment, deletePayment, getAllPayments, getPaymentsByBookingId, getPaymentsByPaymentMethod, getPaymentsByTransactionId, getPaymentsByStatus } = require('../controllers/payments.controller');

router.post('/', createPayment);
router.get('/:id', getPaymentById);
router.put('/:id', updatePayment);
router.delete('/:id', deletePayment);
router.get('/', getAllPayments);    
router.get('/booking/:id', getPaymentsByBookingId); 
router.get('/payment-method/:paymentMethod', getPaymentsByPaymentMethod);
router.get('/transaction-id/:transactionId', getPaymentsByTransactionId);
router.get('/status/:status', getPaymentsByStatus);
module.exports = router;