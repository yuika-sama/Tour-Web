const PasswordReset = require('../models/password_resets.model');

const createPasswordReset = async (req, res) => {
    const passwordReset = req.body;
    const newPasswordReset = await PasswordReset.createPasswordReset(passwordReset);
    res.status(201).json(newPasswordReset);
}

const getPasswordResetById = async (req, res) => {
    const resetId = req.params.resetId;
    const passwordReset = await PasswordReset.getPasswordResetById(resetId);
    res.status(200).json(passwordReset);
}

const updatePasswordReset = async (req, res) => {
    const resetId = req.params.resetId;
    const passwordReset = req.body;
    const updatedPasswordReset = await PasswordReset.updatePasswordReset(resetId, passwordReset);
    res.status(200).json(updatedPasswordReset);
}   

const deletePasswordReset = async (req, res) => {
    const resetId = req.params.resetId;
    const deletedPasswordReset = await PasswordReset.deletePasswordReset(resetId);
    res.status(200).json(deletedPasswordReset);
}   

const getAllPasswordResets = async (req, res) => {
    const passwordResets = await PasswordReset.getAllPasswordResets();
    res.status(200).json(passwordResets);
}   

const findByEmail = async (req, res) => {
    const email = req.params.email;
    const passwordReset = await PasswordReset.findByEmail(email);
    res.status(200).json(passwordReset);
}   

const findByToken = async (req, res) => {
    const token = req.params.token;
    const passwordReset = await PasswordReset.findByToken(token);
    res.status(200).json(passwordReset);
}   

module.exports = {
    createPasswordReset,
    getPasswordResetById,
    updatePasswordReset,
    deletePasswordReset,
    getAllPasswordResets,
    findByEmail,
    findByToken
}   