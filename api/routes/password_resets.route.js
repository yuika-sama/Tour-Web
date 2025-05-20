const express = require('express');
const router = express.Router();
const { createPasswordReset, getPasswordResetById, updatePasswordReset, deletePasswordReset, getAllPasswordResets, findByEmail, requestPasswordReset, verifyResetToken, resetPassword, findByToken } = require('../controllers/password_resets.controller');

router.post('/', createPasswordReset);
router.get('/:resetId', getPasswordResetById);
router.put('/:resetId', updatePasswordReset);
router.delete('/:resetId', deletePasswordReset);
router.get('/', getAllPasswordResets);
router.get('/email/:email', findByEmail);
router.post('/request-reset', requestPasswordReset);
router.get('/verify-reset/:token', verifyResetToken);
router.post('/reset-password', resetPassword);
router.get('/token/:token', findByToken);

module.exports = router;