const userModel = require('../models/users.model');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    const user = req.body;
    if (!user.full_name || !user.email || !user.password || !user.phone_number || !user.auth_provider || !user.provider_id) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    const newUser = await userModel.createUser(user);
    res.status(201).json(newUser);
};

const getUserById = async (req, res) => {
    const id = req.params.id;
    const user = await userModel.getUserById(id);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
};

const updateUser = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const user = req.body;
    if (!user) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    const updatedUser = await userModel.updateUser(id, user);
    if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(updatedUser);
};

const deleteUser = async (req, res) => {    
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const deletedUser = await userModel.deleteUser(id);
    if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(deletedUser);
};

const getAllUsers = async (req, res) => {   
    const users = await userModel.getAllUsers();
    if (!users) {
        return res.status(404).json({ error: 'Users not found' });
    }
    res.status(200).json(users);
};

const updateUserInformation = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const user = req.body;
    if (!user) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    const updatedUser = await userModel.updateUserInformation(id, user);
    res.status(200).json(updatedUser);
};

module.exports = { createUser, getUserById, updateUser, deleteUser, getAllUsers, updateUserInformation };
