const userModel = require('../models/users.model');
const bcrypt = require('bcrypt');

// Đăng ký user mới
const registerUser = async (req, res) => {
    const { full_name, email, password, phone_number, auth_provider, provider_id } = req.body;
    const users = await userModel.searchUserByEmail(email);
    if (users.length > 0) {
        return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const currentDate = new Date();
    const userData = { full_name, email, password_hash: hashedPassword, phone_number, auth_provider, provider_id , created_at: currentDate, updated_at: currentDate};
    const userId = await userModel.createUser(userData);
    res.status(201).json({ userId });
};

const loginUser = async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    const users = await userModel.searchUserByEmail(email);
    if (users.length === 0) {
        return res.status(400).json({ message: 'User not found' });
    }
    const user = users[0];
    if (user.auth_provider !== 'local') {
        return res.status(400).json({ message: 'User is not a local user. Use social login instead.' });
    }
    if (!user.password_hash) {   
        return res.status(400).json({ message: 'User has no password. Use social login instead.' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid password' });
    }
    res.status(200).json({
        user_id: user.user_id,
        full_name: user.full_name,
        email: user.email,
        phone_number: user.phone_number,
        auth_provider: user.auth_provider,
        provider_id: user.provider_id
    });
};

const socialLogin = async (req, res) => {
    const {providerId, name, email, provider} = req.body;
    const currentDate = new Date();
    const users = await userModel.searchUserByProviderId(providerId);
    if (users.length === 0) {
        const newUser = {
            provider_id: providerId,
            full_name: name,
            email: email,
            password_hash: '',
            auth_provider: provider,
            phone_number: '',
            created_at: currentDate,
            updated_at: currentDate
        };
        const userId = await userModel.createUser(newUser);
        res.status(200).json({ userId });
    } else {
        const user = users[0];
        res.status(200).json({
            user_id: user.user_id,
            full_name: user.full_name,
            email: user.email,
            phone_number: user.phone_number,
            auth_provider: user.auth_provider,
            provider_id: user.provider_id,
            created_at: user.created_at,
            updated_at: user.updated_at
        });
    }
};

const createUser = async (req, res) => {
    const userData = req.body;
    const users = await userModel.searchUserByEmail(userData.email);
    if (users.length > 0) {
        return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;
    const userId = await userModel.createUser(userData);
    if (!userId) {
        return res.status(400).json({ message: 'Failed to create user' });
    }
    res.status(201).json({ userId });
};

const getUserById = async (req, res) => {
    const userId = req.params.id;
    const user = await userModel.getUserById(userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    const { password, ...userData } = user;
    res.status(200).json(userData);
};

const updateProfile = async (req, res) => {
    const userId = req.params.id;
    const userData = req.body;
    const updatedUser = await userModel.updateUser(userId, userData);
    if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({message: "User updated successfully", user: updatedUser});
};

const updatePassword = async (req, res) => {
    const userId = req.params.id;
    const {current_password, new_password} = req.body;
    if (!current_password || !new_password) {
        return res.status(400).json({ message: 'Current password and new password are required' });
    }
    const currentUser = await userModel.getUserById(userId);
    if (!currentUser) {
        return res.status(404).json({ message: 'User not found' });
    }
    if (currentUser.auth_provider !== 'local') {
        return res.status(400).json({ message: 'User is not a local user. Cannot update password.' });
    }
    const isPasswordValid = await bcrypt.compare(current_password, currentUser.password_hash);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid current password' });
    }
    const hashedPassword = await bcrypt.hash(new_password, 10);
    currentUser.password_hash = hashedPassword;
    const currentDate = new Date();
    currentUser.updated_at = currentDate;
    const updatedUser = await userModel.updateUser(userId, currentUser);
    if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({message: "Password updated successfully", user_id: currentUser.user_id});
};

const deleteUser = async (req, res) => {
    const userId = req.params.id;
    const deletedUser = await userModel.deleteUser(userId);
    if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
};

const getAllUsers = async (req, res) => {
    const users = await userModel.getAllUsers();
    if (!users) {
        return res.status(404).json({ message: 'No users found' });
    }
    res.status(200).json(users);
};

module.exports = {
    registerUser,
    loginUser,
    socialLogin,
    createUser,
    getUserById,
    updateProfile,
    updatePassword,
    deleteUser,
    getAllUsers,
};
