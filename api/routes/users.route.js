const express = require('express');
const router = express.Router();
const { createUser, getUserById, updateUser, deleteUser, getAllUsers, updateUserInformation } = require('../controllers/users.controller');
const { authenticateToken } = require('../middlewares/auth.middlewares');


router.post('/', createUser);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/', getAllUsers);
router.put('/:id/information', updateUserInformation);

module.exports = router;
