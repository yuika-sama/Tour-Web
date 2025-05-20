const User = require('../models/users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { addToBlacklist, isBlacklisted } = require('../utils/token-blacklist');

const register = async (req, res) => {
    const {full_name, email, password, phone_number} = req.body;
    if (!full_name || !email || !password || !phone_number) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }
    if (password.length < 8 || !/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long and contain at least one number and one letter' });
    }
    if (email === undefined || email === null || email === '') {
        return res.status(400).json({ message: 'Email is required' });
    }
    if (password === undefined || password === null || password === '') {
        return res.status(400).json({ message: 'Password is required' });
    }
    const existingUser = await User.getUserByEmail(email);
    if (existingUser.length > 0) {
        console.log({existingUser});
        return res.status(400).json({ message: 'User already exists' });
    }

    const auth_provider = 'local';
    const provider_id = null;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = {full_name, email, password_hash: hashedPassword, phone_number, auth_provider, provider_id};
    const user = await User.createUser(userData);
    res.status(201).json({message: 'User created successfully', userData});
};

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    if (email === undefined || email === null || email === '') {
        return res.status(400).json({ message: 'Email is required' });
    }
    if (password === undefined || password === null || password === '') {
        return res.status(400).json({ message: 'Password is required' });
    }
    const user = await User.getUserByEmail(email);
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid password' });
    }   
    const token = jwt.sign({ userId: user.user_id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
};

const logout = async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const exp = decoded.exp;
        addToBlacklist(token, exp);
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to logout' });
    }
};

module.exports = {
    register,
    login,
    logout
};



