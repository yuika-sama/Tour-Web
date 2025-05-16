const pool = require('../config/db');

const User = {
    user_id: {
        type: Number,
        autoIncrement: true,
        primaryKey: true
    },
    full_name: {
        type: String,
        allowNull: false
    },
    email: {    
        type: String,
        allowNull: false,
        unique: true
    },
    password: {
        type: String,
        allowNull: false
    },
    phone_number: {
        type: String,
        allowNull: false
    },
    auth_provider: {
        type: String,
        allowNull: false
    },
    provider_id: {
        type: String,
        allowNull: true
    },
    created_at: {
        type: Date,
        allowNull: false,
        defaultValue: Date.now
    },
    updated_at: {
        type: Date, 
        allowNull: false,
        defaultValue: Date.now
    }
};

module.exports = {
   createUser: async (userData) => {    
    const [result] = await pool.query('INSERT INTO users SET ?', userData);
    return result.insertId;
   },
    getUserById: async (id) => {
    const [result] = await pool.query('SELECT * FROM users WHERE user_id = ?', [id]);
    return result[0];
   },
   updateUser: async (id, userData) => {
    const [result] = await pool.query('UPDATE users SET ? WHERE user_id = ?', [userData, id]);
    return result.affectedRows;
   },
   deleteUser: async (id) => {
    const [result] = await pool.query('DELETE FROM users WHERE user_id = ?', [id]);
    return result.affectedRows;
   },
   getAllUsers: async () => {
    const [result] = await pool.query('SELECT * FROM users');
    return result;
   },
   searchUserByEmail: async (email) => {
    const [result] = await pool.query('SELECT * FROM users WHERE email LIKE ?', [email]);
    return result;
   },
   searchUserByProviderId: async (providerId) => {
    const [result] = await pool.query('SELECT * FROM users WHERE provider_id LIKE ?', [providerId]);
    return result;
   },
}