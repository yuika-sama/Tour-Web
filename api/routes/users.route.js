const express = require('express');
const router = express.Router();
const {createUser, getUserById, updateProfile, updatePassword, deleteUser, getAllUsers, registerUser, loginUser, socialLogin} = require('../controllers/users.controller');

router.post('/', createUser);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/social-login', socialLogin);

router.get('/:id', getUserById);
router.get('/', getAllUsers); //

router.put('/:id/profile', updateProfile);
router.put('/:id/password', updatePassword);

router.delete('/:id', deleteUser);


module.exports = router;
