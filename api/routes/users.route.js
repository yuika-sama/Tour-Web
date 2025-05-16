const express = require('express');
const router = express.Router();
const {createUser, getUserById, updateUser, deleteUser, getAllUsers, searchUserByName, searchUserByEmail, searchUserByProviderId} = require('../controllers/users.controller');

router.post('/', createUser);

router.get('/:id', getUserById);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

router.get('/', getAllUsers);

router.get('/search/name/:name', searchUserByName);

router.get('/search/email/:email', searchUserByEmail);

router.get('/search/providerId/:providerId', searchUserByProviderId);

module.exports = router;
