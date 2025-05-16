const Payment = require('../models/payments.model');

const createPayment = async (req, res) => {
    const paymentData = req.body;
    const paymentId = await Payment.createPayment(paymentData);
    res.status(201).json({ message: 'Payment created successfully', paymentId });
}

const getPaymentById = async (req, res) => {
    const paymentId = req.params.paymentId;
    const payment = await Payment.getPaymentById(paymentId);
    res.status(200).json(payment);
}

const updatePayment = async (req, res) => {
    const paymentId = req.params.paymentId;
    const paymentData = req.body;
    const updatedPayment = await Payment.updatePayment(paymentId, paymentData);
    res.status(200).json(updatedPayment);
}   

const deletePayment = async (req, res) => {
    const paymentId = req.params.paymentId;
    const deletedPayment = await Payment.deletePayment(paymentId);
    res.status(200).json(deletedPayment);
}   

const getAllPayments = async (req, res) => {
    const payments = await Payment.getAllPayments();
    res.status(200).json(payments);
}   

const findByBookingId = async (req, res) => {
    const bookingId = req.params.bookingId;
    const payment = await Payment.findByBookingId(bookingId);
    res.status(200).json(payment);
}   

const findByPaymentMethod = async (req, res) => {
    const paymentMethod = req.params.paymentMethod;
    const payment = await Payment.findByPaymentMethod(paymentMethod);
    res.status(200).json(payment);
}   

const findByTransactionId = async (req, res) => {
    const transactionId = req.params.transactionId;
    const payment = await Payment.findByTransactionId(transactionId);
    res.status(200).json(payment);
}   

const findByStatus = async (req, res) => {
    const status = req.params.status;
    const payment = await Payment.findByStatus(status);
    res.status(200).json(payment);
}   

module.exports = {
    createPayment,
    getPaymentById,
    updatePayment,
    deletePayment,
    getAllPayments,
    findByBookingId,
    findByPaymentMethod,
    findByTransactionId,
    findByStatus
};  