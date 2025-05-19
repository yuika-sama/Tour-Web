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
    createUser: async(userData) => {
        const { full_name, email, password, phone_number, auth_provider, provider_id } = userData;
        userData.created_at = new Date();
        userData.updated_at = new Date();
        const query = `INSERT INTO users (full_name, email, password, phone_number, auth_provider, provider_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
        const result = await pool.query(query, [full_name, email, password, phone_number, auth_provider, provider_id, userData.created_at, userData.updated_at]);
        return result.rows[0];
    },
    getUserById: async(id) => {
        const query = `SELECT * FROM users WHERE user_id = $1`;
        const result = await pool.query(query, [id]);
        return result.rows[0];
    },
    updateUser: async(id, userData) => {
        const { full_name, email, password, phone_number, auth_provider, provider_id } = userData;
        userData.updated_at = new Date();
        const query = `UPDATE users SET full_name = $1, email = $2, password = $3, phone_number = $4, auth_provider = $5, provider_id = $6, updated_at = $7 WHERE user_id = $8`;
        const result = await pool.query(query, [full_name, email, password, phone_number, auth_provider, provider_id, updated_at, id]);
        return result.rows[0];
    },
    deleteUser: async(id) => {
        const query = `DELETE FROM users WHERE user_id = $1`;
        const result = await pool.query(query, [id]);
        return result.rows[0];
    },
    getAllUsers: async() => {
        const query = `SELECT * FROM users`;
        const result = await pool.query(query);
        return result.rows;
    },
    updateUserInformation: async(id, userData) => {
        const { full_name, phone_number, password } = userData;
        userData.updated_at = new Date();
        const query = `UPDATE users SET full_name = $1, phone_number = $2, updated_at = $3 WHERE user_id = $4`;
        const result = await pool.query(query, [full_name, phone_number, updated_at, id]);
        return result.rows[0];
    },
    getUserByEmail: async(email) => {
        const query = `SELECT * FROM users WHERE email = $1`;
        const result = await pool.query(query, [email]);
        return result.rows[0];
    }
}