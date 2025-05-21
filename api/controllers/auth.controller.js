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
    const users = await User.getUserByEmail(email);
    if (!users || users.length === 0) {
        return res.status(400).json({ message: 'User not found' });
    }
    const user = users[0]
    if (!user.password_hash){
        return res.status(404).json({message: "Invalid user data"})
    }
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid password' });
    }   
    const token = jwt.sign({ userId: user.user_id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
};

const logout = async (req, res) => {
    const authHeader = req.headers["authorization"]
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized - Token không hợp lệ" })
    }
  
    const token = authHeader.split(" ")[1]
  
    // Kiểm tra JWT_SECRET
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET không được cấu hình!")
      return res.status(500).json({ message: "Lỗi cấu hình server" })
    }
  
    try {
      console.log("Đang xác minh token với secret:", process.env.JWT_SECRET.substring(0, 3) + "...")
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      const exp = decoded.exp
      addToBlacklist(token, exp)
      res.status(200).json({ message: "Đăng xuất thành công" })
    } catch (error) {
      console.error("Lỗi xác minh token:", error.message)
  
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({
          message: "Token không hợp lệ",
          error: error.message,
          hint: "Hãy kiểm tra lại JWT_SECRET trong file .env và đảm bảo nó giống nhau khi đăng nhập và đăng xuất",
        })
      }
  
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token đã hết hạn" })
      }
  
      res.status(500).json({ message: "Đăng xuất thất bại", error: error.message })
    }
  }

module.exports = {
    register,
    login,
    logout
};



