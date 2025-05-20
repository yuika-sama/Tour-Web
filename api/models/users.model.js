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
    password_hash: {
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
    createUser: async(userData) => {
        const { full_name, email, password_hash, phone_number, auth_provider, provider_id } = userData;
        const updated_at = new Date();
        const created_at = new Date();
        const query = `INSERT INTO users (full_name, email, password_hash, phone_number, auth_provider, provider_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const result = await pool.query(query, [full_name, email, password_hash, phone_number, auth_provider, provider_id, created_at, updated_at]);
        const [user] = await pool.query('SELECT * FROM users WHERE user_id = ?', [result.insertId]);
        return user[0];
    },
    getUserById: async(id) => {
        const query = `SELECT * FROM users WHERE user_id = ?`;
        const [rows] = await pool.query(query, [id]);
        return rows[0];
    },
    updateUser: async(id, userData) => {
        const { full_name, email, password_hash, phone_number, auth_provider, provider_id } = userData;
        const updated_at = new Date();
        const query = `UPDATE users SET full_name = ?, email = ?, password_hash = ?, phone_number = ?, auth_provider = ?, provider_id = ?, updated_at = ? WHERE user_id = ?`;
        const [result] = await pool.query(query, [full_name, email, password_hash, phone_number, auth_provider, provider_id, updated_at, id]);
        return result[0];
    },
    deleteUser: async(id) => {
        const query = `DELETE FROM users WHERE user_id = ?`;
        const [result] = await pool.query(query, [id]);
        return result[0];
    },
    getAllUsers: async() => {
        const query = `SELECT * FROM users`;
        const result = await pool.query(query);
        return result[0];
    },
    updateUserInformation: async(id, userData) => {
        const { full_name, phone_number, password_hash } = userData;
        const updated_at = new Date();
        const query = `UPDATE users SET full_name = ?, phone_number = ?, password_hash = ?, updated_at = ? WHERE user_id = ?`;
        const [result] = await pool.query(query, [full_name, phone_number, password_hash, updated_at, id]);
        return result[0];
    },
    getUserByEmail: async(email) => {
        const query = "SELECT * FROM users WHERE email = ?";
        const result = await pool.query(query, [email]);
        return result[0];
    }
}