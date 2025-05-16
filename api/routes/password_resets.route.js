const express = require('express');
const router = express.Router();
const { createPasswordReset, getPasswordResetById, updatePasswordReset, deletePasswordReset, getAllPasswordResets, findByEmail, findByToken } = require('../controllers/password_resets.controller');

router.post('/', createPasswordReset);

router.get('/:resetId', getPasswordResetById);

router.put('/:resetId', updatePasswordReset);

router.delete('/:resetId', deletePasswordReset);

router.get('/', getAllPasswordResets);

router.get('/email/:email', findByEmail);

router.get('/token/:token', findByToken);

module.exports = router;
