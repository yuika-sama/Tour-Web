const express = require('express');
const router = express.Router();
const { createPasswordReset, getPasswordResetById, updatePasswordReset, deletePasswordReset, getAllPasswordResets, findByEmail, requestPasswordReset, verifyResetToken, resetPassword, findByToken } = require('../controllers/password_resets.controller');

// GET routes
router.get('/', getAllPasswordResets);
router.get('/email/:email', findByEmail);
router.get('/token/:token', findByToken);
router.get('/verify-reset/:token', verifyResetToken);
router.get('/:resetId', getPasswordResetById);

// POST routes
router.post('/', createPasswordReset);
router.post('/request-reset', requestPasswordReset);
router.post('/reset-password', resetPassword);

// PUT route
router.put('/:resetId', updatePasswordReset);

// DELETE route
router.delete('/:resetId', deletePasswordReset);

module.exports = router;