const Payment = require('../models/payments.model');

const createPayment = async (req, res) => {
    const payment = req.body;
    const newPayment = await Payment.createPayment(payment);
    res.status(201).json({ message: 'Payment created successfully', newPayment });
};  

const getPaymentById = async (req, res) => {
    const paymentId = req.params.id;
    const payment = await Payment.getPaymentById(paymentId);
    res.status(200).json({payment});
};

const updatePayment = async (req, res) => {
    const paymentId = req.params.id;
    const payment = req.body;
    const updatedPayment = await Payment.updatePayment(paymentId, payment);
    res.status(200).json({ message: 'Payment updated successfully', updatedPayment });
};  

const deletePayment = async (req, res) => {
    const paymentId = req.params.id;
    const deletedPayment = await Payment.deletePayment(paymentId);
    res.status(200).json({ message: 'Payment deleted successfully', deletedPayment });
};  

const getAllPayments = async (req, res) => {
    const payments = await Payment.getAllPayments();
    if (payments.length === 0) {
        return res.status(404).json({ message: 'Payments not found' });
    }
    res.status(200).json({ message: 'Payments retrieved successfully', payments });
};  

const getPaymentsByBookingId = async (req, res) => {
    const bookingId = req.params.id;
    const payments = await Payment.findByBookingId(bookingId);
    if (!payments) {
        return res.status(404).json({ message: 'Payments not found' });
    }
    res.status(200).json({ message: 'Payments retrieved successfully', payments });
};  

const getPaymentsByPaymentMethod = async (req, res) => {
    const paymentMethod = req.params.paymentMethod;
    const payments = await Payment.findByPaymentMethod(paymentMethod);
    if (payments.length === 0) {
        return res.status(404).json({ message: 'Payments not found' });
    }
    res.status(200).json({ message: 'Payments retrieved successfully', payments });
};  

const getPaymentsByTransactionId = async (req, res) => {
    const transactionId = req.params.transactionId;
    const payments = await Payment.findByTransactionId(transactionId);
    if (!payments) {
        return res.status(404).json({ message: 'Payments not found' });
    }
    res.status(200).json({ message: 'Payments retrieved successfully', payments });
};  

const getPaymentsByStatus = async (req, res) => {
    const status = req.params.status;
    const payments = await Payment.findByStatus(status);
    if (payments.length === 0) {
        return res.status(404).json({ message: 'Payments not found' });
    }
    res.status(200).json({ message: 'Payments retrieved successfully', payments });
}; 

module.exports = {
    createPayment,
    getPaymentById,
    updatePayment,
    deletePayment,
    getAllPayments,
    getPaymentsByBookingId, 
    getPaymentsByPaymentMethod,
    getPaymentsByTransactionId,
    getPaymentsByStatus
};  