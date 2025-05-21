const express = require('express');
const router = express.Router();
const { createUser, getUserById, updateUser, deleteUser, getAllUsers, updateUserInformation } = require('../controllers/users.controller');
const { authenticateToken } = require('../middlewares/auth.middlewares');

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id/information', updateUserInformation);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
module.exports = router;
