const Payment = require('../models/payments.model');

const createPayment = async (req, res) => {
    const payment = req.body;
    const newPayment = await Payment.createPayment(payment);
    res.status(201).json(newPayment);
};  

const getPaymentById = async (req, res) => {
    const paymentId = req.params.id;
    const payment = await Payment.getPaymentById(paymentId);
    res.status(200).json(payment);
};

const updatePayment = async (req, res) => {
    const paymentId = req.params.id;
    const payment = req.body;
    const updatedPayment = await Payment.updatePayment(paymentId, payment);
    res.status(200).json(updatedPayment);
};  

const deletePayment = async (req, res) => {
    const paymentId = req.params.id;
    const deletedPayment = await Payment.deletePayment(paymentId);
    res.status(200).json(deletedPayment);
};  

const getAllPayments = async (req, res) => {
    const payments = await Payment.getAllPayments();
    res.status(200).json(payments);
};  

const getPaymentsByBookingId = async (req, res) => {
    const bookingId = req.params.id;
    const payments = await Payment.getPaymentsByBookingId(bookingId);
    res.status(200).json(payments);
};  

const getPaymentsByPaymentMethod = async (req, res) => {
    const paymentMethod = req.params.paymentMethod;
    const payments = await Payment.getPaymentsByPaymentMethod(paymentMethod);
    res.status(200).json(payments);
};  

const getPaymentsByTransactionId = async (req, res) => {
    const transactionId = req.params.transactionId;
    const payments = await Payment.getPaymentsByTransactionId(transactionId);
    res.status(200).json(payments);
};  

const getPaymentsByStatus = async (req, res) => {
    const status = req.params.status;
    const payments = await Payment.getPaymentsByStatus(status);
    res.status(200).json(payments);
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