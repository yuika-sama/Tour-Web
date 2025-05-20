const userModel = require('../models/users.model');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    const user = req.body;
    if (!user.full_name){
        return res.status(400).json({ error: 'Full name is required' });
    }
    if (!user.email){
        return res.status(400).json({ error: 'Email is required' });
    }
    if (!user.password){
        return res.status(400).json({ error: 'Password is required' });
    }
    if (!user.phone_number){
        return res.status(400).json({ error: 'Phone number is required' });
    }
    if (!user.auth_provider){
        user.auth_provider = 'local';
    }
    if (!user.provider_id){
        user.provider_id = null;
    }
    
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const {full_name, email, password, phone_number, auth_provider, provider_id} = user;
    const newUser = await userModel.createUser({full_name, email, password_hash: hashedPassword, phone_number, auth_provider, provider_id});
    res.status(201).json({message: 'User created successfully', newUser});
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

    // Required important data not null or undefined
    if (user.full_name === undefined || user.full_name === null || user.full_name === '') {
        return res.status(400).json({ error: 'Full name is required' });
    }
    if (user.email === undefined || user.email === null || user.email === '') {
        return res.status(400).json({ error: 'Email is required' });
    }
    if (user.phone_number === undefined || user.phone_number === null || user.phone_number === '') {
        return res.status(400).json({ error: 'Phone number is required' });
    }

    //auto fill auth_provider and provider_id
    if (user.auth_provider === undefined || user.auth_provider === null || user.auth_provider === '') {
        user.auth_provider = 'local';
    }
    if (user.provider_id === undefined || user.provider_id === null || user.provider_id === '') {
        user.provider_id = null;
    }

    // Password validation
    if (user.password === undefined || user.password === null || user.password === '') {
        return res.status(400).json({ error: 'Password is required' });
    }   
    if (user.password.length < 8 || !/\d/.test(user.password) || !/[a-zA-Z]/.test(user.password)) {
        return res.status(400).json({ error: 'Password must be at least 8 characters long and contain at least one number and one letter' });
    }

    // Check if user exists
    const currentUser = await userModel.getUserById(id);
    if (!currentUser) {
        return res.status(404).json({ error: 'User not found' });
    }
    if (currentUser.email !== user.email) {
        const existingUser = await userModel.getUserByEmail(user.email);
        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'Email is already in use', existingUser });
        }
    }

    // Check if password is the same as the current password
    const hashedPassword = await bcrypt.hash(user.password, 10);
    if (currentUser.password_hash === hashedPassword) {
        return res.status(400).json({ error: 'Password is the same as the current password' });
    }
    // Check if no changes were made
    if (currentUser.full_name === user.full_name || currentUser.phone_number === user.phone_number) {
        return res.status(400).json({ error: 'No changes were made' });
    }
    user.password_hash = hashedPassword;
    const updatedUser = await userModel.updateUser(id, user);
    res.status(200).json({message: 'User updated successfully', updatedUser});
};

const deleteUser = async (req, res) => {    
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const currentUser = await userModel.getUserById(id);
    if (!currentUser) {
        return res.status(404).json({ error: 'User not found' });
    }
    const deletedUser = await userModel.deleteUser(id);
    res.status(200).json({message: 'User deleted successfully', deletedUser});
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
    const {full_name, phone_number} = user;
    const updatedUser = await userModel.updateUserInformation(id, {full_name, phone_number, password_hash: hashedPassword});
    res.status(200).json({message: 'User information updated successfully', updatedUser});
};

module.exports = { createUser, getUserById, updateUser, deleteUser, getAllUsers, updateUserInformation };
