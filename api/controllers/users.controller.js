const userModel = require('../models/users.model');

const createUser = async (req, res) => {
    const userData = req.body;
    const userId = await userModel.createUser(userData);
    res.status(201).json({ userId });
}

const getUserById = async (req, res) => {
    const userId = req.params.id;
    const user = await userModel.getUserById(userId);
    res.status(200).json(user);
}

const updateUser = async (req, res) => {
    const userId = req.params.id;
    const userData = req.body;
    const updatedUser = await userModel.updateUser(userId, userData);
    res.status(200).json(updatedUser);
}

const deleteUser = async (req, res) => {
    const userId = req.params.id;
    const deletedUser = await userModel.deleteUser(userId);
    res.status(200).json(deletedUser);
}

const getAllUsers = async (req, res) => {
    const users = await userModel.getAllUsers();
    res.status(200).json(users);
}

const searchUserByName = async (req, res) => {
    const name = req.params.name;
    const users = await userModel.searchUserByName(name);
    res.status(200).json(users);
}

const searchUserByEmail = async (req, res) => {
    const email = req.params.email;
    const users = await userModel.searchUserByEmail(email);
    res.status(200).json(users);
}

const searchUserByProviderId = async (req, res) => {
    const providerId = req.params.providerId;
    const users = await userModel.searchUserByProviderId(providerId);
    res.status(200).json(users);
}

module.exports = {
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    getAllUsers,
    searchUserByName,
    searchUserByEmail,
    searchUserByProviderId
}



