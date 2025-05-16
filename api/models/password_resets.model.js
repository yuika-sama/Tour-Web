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
    createPasswordReset: async (passwordReset) => {
        const [result] = await pool.query('INSERT INTO password_resets (email, token, expires_at) VALUES (?, ?, ?)', [passwordReset.email, passwordReset.token, passwordReset.expires_at]);
        return result.insertId;
    },
    getPasswordResetById: async (resetId) => {      
        const [result] = await pool.query('SELECT * FROM password_resets WHERE reset_id = ?', [resetId]);
        return result[0];
    },
    updatePasswordReset: async (resetId, passwordReset) => {
        const [result] = await pool.query('UPDATE password_resets SET email = ?, token = ?, expires_at = ? WHERE reset_id = ?', [passwordReset.email, passwordReset.token, passwordReset.expires_at, resetId]);
        return result.affectedRows;
    },
    deletePasswordReset: async (resetId) => {
        const [result] = await pool.query('DELETE FROM password_resets WHERE reset_id = ?', [resetId]);
        return result.affectedRows;
    },
    getAllPasswordResets: async () => {
        const [result] = await pool.query('SELECT * FROM password_resets');
        return result;
    },
    findByEmail: async (email) => {
        const [result] = await pool.query('SELECT * FROM password_resets WHERE email = ?', [email]);
        return result;
    },
    findByToken: async (token) => { 
        const [result] = await pool.query('SELECT * FROM password_resets WHERE token = ?', [token]);
        return result[0];
    }
}