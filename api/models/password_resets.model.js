const pool = require('../config/db');

const PasswordReset = {
    reset_id: {
        type: Number,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: String,
        allowNull: false
    },
    token: {
        type: String,
        allowNull: false
    },
    expires_at: {
        type: Date,
        allowNull: false
    },
    updated_at: {
        type: Date,
        allowNull: false,
        defaultValue: Date.now
    }
};


module.exports = {
    createPasswordReset: async(passwordReset) => {
        try {
            const { email, token, expires_at } = passwordReset;
            const updated_at = new Date();
            const query = `INSERT INTO password_resets (email, token, expires_at, updated_at) VALUES (?, ?, ?, ?)`;
            const [result] = await pool.query(query, [email, token, expires_at, updated_at]);
            return result[0];
        } catch (error) {
            console.error('Error creating password reset:', error);
            throw new Error('Failed to create password reset');
        }
    },
    getPasswordResetById: async(resetId) => {
        try {
            const query = `SELECT * FROM password_resets WHERE reset_id = ?`;
            const [result] = await pool.query(query, [resetId]);
            return result[0];
        } catch (error) {
            console.error('Error getting password reset by id:', error);
            throw new Error('Failed to get password reset by id');
        }
    },
    updatePasswordReset: async(resetId, passwordReset) => {
        try {
            const { email, token, expires_at } = passwordReset;
            const updated_at = new Date();
            const query = `UPDATE password_resets SET email = ?, token = ?, expires_at = ?, updated_at = ? WHERE reset_id = ?`;
            const [result] = await pool.query(query, [email, token, expires_at, updated_at, resetId]);
            return result[0];
        } catch (error) {
            console.error('Error updating password reset:', error);
            throw new Error('Failed to update password reset');
        }
    },
    deletePasswordReset: async(resetId) => {
        try {
            const query = `DELETE FROM password_resets WHERE reset_id = ?`;
            const [result] = await pool.query(query, [resetId]);
            return result[0];
        } catch (error) {
            console.error('Error deleting password reset:', error);
            throw new Error('Failed to delete password reset');
        }
    },
    getAllPasswordResets: async() => {
        try {
            const query = `SELECT * FROM password_resets`;
            const [result] = await pool.query(query);
            return result;
        } catch (error) {
            console.error('Error getting all password resets:', error);
            throw new Error('Failed to get all password resets');
        }
    },
    findByEmail: async(email) => {
        try {
            const query = `SELECT * FROM password_resets WHERE email = ?`;
            const [result] = await pool.query(query, [email]);
            return result[0];
        } catch (error) {
            console.error('Error finding password reset by email:', error);
            throw new Error('Failed to find password reset by email');
        }
    },
    findByToken: async(token) => {
        const query = `SELECT * FROM password_resets WHERE token = ?`;
        const [result] = await pool.query(query, [token]);
        return result;
    },
    deleteByEmail: async(email) => {
        try {
            const query = `DELETE FROM password_resets WHERE email = ?`;
            const [result] = await pool.query(query, [email]);
            return result[0];
        } catch (error) {
            console.error('Error deleting password reset by email:', error);
            throw new Error('Failed to delete password reset by email');
        }
    },
    deleteByToken: async(token) => {
        try {
            const query = `DELETE FROM password_resets WHERE token = ?`;
            const [result] = await pool.query(query, [token]);
            return result[0];
        } catch (error) {
            console.error('Error deleting password reset by token:', error);
            throw new Error('Failed to delete password reset by token');
        }
    }
}