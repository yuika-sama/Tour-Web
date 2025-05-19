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
            const query = `INSERT INTO password_resets (email, token, expires_at) VALUES ($1, $2, $3)`;
            const result = await pool.query(query, [passwordReset.email, passwordReset.token, passwordReset.expires_at]);
            return result.rows[0];
        } catch (error) {
            console.error('Error creating password reset:', error);
            throw new Error('Failed to create password reset');
        }
    },
    getPasswordResetById: async(resetId) => {
        try {
            const query = `SELECT * FROM password_resets WHERE reset_id = $1`;
            const result = await pool.query(query, [resetId]);
            return result.rows[0];
        } catch (error) {
            console.error('Error getting password reset by id:', error);
            throw new Error('Failed to get password reset by id');
        }
    },
    updatePasswordReset: async(resetId, passwordReset) => {
        try {
            const query = `UPDATE password_resets SET email = $1, token = $2, expires_at = $3 WHERE reset_id = $4`;
            const result = await pool.query(query, [passwordReset.email, passwordReset.token, passwordReset.expires_at, resetId]);
            return result.rows[0];
        } catch (error) {
            console.error('Error updating password reset:', error);
            throw new Error('Failed to update password reset');
        }
    },
    deletePasswordReset: async(resetId) => {
        try {
            const query = `DELETE FROM password_resets WHERE reset_id = $1`;
            const result = await pool.query(query, [resetId]);
            return result.rows[0];
        } catch (error) {
            console.error('Error deleting password reset:', error);
            throw new Error('Failed to delete password reset');
        }
    },
    getAllPasswordResets: async() => {
        try {
            const query = `SELECT * FROM password_resets`;
            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            console.error('Error getting all password resets:', error);
            throw new Error('Failed to get all password resets');
        }
    },
    findByEmail: async(email) => {
        try {
            const query = `SELECT * FROM password_resets WHERE email = $1`;
            const result = await pool.query(query, [email]);
            return result.rows[0];
        } catch (error) {
            console.error('Error finding password reset by email:', error);
            throw new Error('Failed to find password reset by email');
        }
    },
    findByToken: async(token) => {
        try {
            const query = `SELECT * FROM password_resets WHERE token = $1`;
            const result = await pool.query(query, [token]);
            return result.rows[0];
        } catch (error) {
            console.error('Error finding password reset by token:', error);
            throw new Error('Failed to find password reset by token');
        }
    },
    deleteByEmail: async(email) => {
        try {
            const query = `DELETE FROM password_resets WHERE email = $1`;
            const result = await pool.query(query, [email]);
            return result.rows[0];
        } catch (error) {
            console.error('Error deleting password reset by email:', error);
            throw new Error('Failed to delete password reset by email');
        }
    },
    deleteByToken: async(token) => {
        try {
            const query = `DELETE FROM password_resets WHERE token = $1`;
            const result = await pool.query(query, [token]);
            return result.rows[0];
        } catch (error) {
            console.error('Error deleting password reset by token:', error);
            throw new Error('Failed to delete password reset by token');
        }
    }
}