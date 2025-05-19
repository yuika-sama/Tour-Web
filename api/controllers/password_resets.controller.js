const PasswordReset = require("../models/password_resets.model")
const User = require("../models/users.model")
const bcrypt = require("bcrypt")
const crypto = require("crypto")
const { sendPasswordResetEmail } = require("../utils/email-service")

const createPasswordReset = async(req, res) => {
    const passwordReset = req.body
    if (!passwordReset.email) {
        return res.status(400).json({ message: "Email is required" })
    }
    if (!passwordReset.token) {
        return res.status(400).json({ message: "Token is required" })
    }
    if (!passwordReset.expiresAt) {
        return res.status(400).json({ message: "Expires at is required" })
    }
    const newPasswordReset = await PasswordReset.createPasswordReset(passwordReset)
    if (!newPasswordReset) {
        return res.status(400).json({ message: "Failed to create password reset" })
    }
    res.status(201).json(newPasswordReset)
}

const getPasswordResetById = async(req, res) => {
    const { resetId } = req.params
    if (!resetId) {
        return res.status(400).json({ message: "Reset id is required" })
    }
    const passwordReset = await PasswordReset.getPasswordResetById(resetId)
    if (!passwordReset) {
        return res.status(404).json({ message: "Password reset not found" })
    }
    res.status(200).json(passwordReset)
}

const updatePasswordReset = async(req, res) => {
    const { resetId } = req.params
    if (!resetId) {
        return res.status(400).json({ message: "Reset id is required" })
    }
    const passwordReset = req.body
    if (!passwordReset) {
        return res.status(400).json({ message: "Password reset is required" })
    }
    if (!passwordReset.email) {
        return res.status(400).json({ message: "Email is required" })
    }
    if (!passwordReset.token) {
        return res.status(400).json({ message: "Token is required" })
    }
    if (!passwordReset.expiresAt) {
        return res.status(400).json({ message: "Expires at is required" })
    }
    passwordReset.updatedAt = new Date()
    const updatedPasswordReset = await PasswordReset.updatePasswordReset(resetId, passwordReset)
    if (!updatedPasswordReset) {
        return res.status(400).json({ message: "Failed to update password reset" })
    }
    res.status(200).json(updatedPasswordReset)
}

const deletePasswordReset = async(req, res) => {
    const { resetId } = req.params
    if (!resetId) {
        return res.status(400).json({ message: "Reset id is required" })
    }
    const passwordReset = await PasswordReset.deletePasswordReset(resetId)
    if (!passwordReset) {
        return res.status(404).json({ message: "Password reset not found" })
    }
    res.status(200).json(passwordReset)
}

const getAllPasswordResets = async(req, res) => {
    const passwordResets = await PasswordReset.getAllPasswordResets()
    if (!passwordResets) {
        return res.status(404).json({ message: "Password resets not found" })
    }
    res.status(200).json(passwordResets)
}

const findByEmail = async(req, res) => {
    const { email } = req.params
    if (!email) {
        return res.status(400).json({ message: "Email is required" })
    }
    const passwordReset = await PasswordReset.findByEmail(email)
    if (!passwordReset) {
        return res.status(404).json({ message: "Password reset not found" })
    }
    res.status(200).json(passwordReset)
}

const requestPasswordReset = async(req, res) => {
    const { email } = req.body
    if (!email) {
        return res.status(400).json({ message: "Email is required" })
    }
    const user = await User.getUserByEmail(email)
    if (!user) {
        return res.status(404).json({ message: "User not found" })
    }
    const token = crypto.randomBytes(32).toString("hex")
    const expiresAt = new Date()
    expiresAt.setHours(expiresAt.getHours() + 1)
    await PasswordReset.deleteByEmail(email)
    const passwordReset = await PasswordReset.createPasswordReset({ email, token, expiresAt })
    if (!passwordReset) {
        return res.status(400).json({ message: "Failed to create password reset" })
    }
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`
    await sendPasswordResetEmail(email, resetUrl, user.name)
    res.status(200).json(passwordReset)
}
const verifyResetToken = async(req, res) => {
    const { token } = req.params
    if (!token) {
        return res.status(400).json({ message: "Token is required" })
    }
    const passwordReset = await PasswordReset.findByToken(token)
    if (!passwordReset) {
        return res.status(404).json({ message: "Password reset not found" })
    }
    const now = new Date()
    if (now > new Date(passwordReset.expiresAt)) {
        return res.status(400).json({ message: "Token expired" })
    }
    res.status(200).json(passwordReset)
}
const resetPassword = async(req, res) => {
    const { token, password, confirmPassword } = req.body
    if (!token || !password || !confirmPassword) {
        return res.status(400).json({ message: "All fields are required" })
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" })
    }
    if (password.length < 8 || !/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
        return res
            .status(400)
            .json({ message: "Password must be at least 8 characters long and contain at least one number and one letter" })
    }
    const passwordReset = await PasswordReset.findByToken(token)
    if (!passwordReset) {
        return res.status(404).json({ message: "Password reset not found" })
    }
    const now = new Date()
    if (now > new Date(passwordReset.expiresAt)) {
        return res.status(400).json({ message: "Token expired" })
    }
    const user = await User.getUserByEmail(passwordReset.email)
    if (!user) {
        return res.status(404).json({ message: "User not found" })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const updatedUser = {
        ...user,
        password: hashedPassword,
        updatedAt: new Date(),
    }
    await User.updateUser(user.id, updatedUser)
    await PasswordReset.deleteByToken(token)
    const newPasswordReset = {
        email: user.email,
        token: "USED-" + crypto.randomBytes(32).toString("hex"),
        expiresAt: new Date(),
    }
    await PasswordReset.createPasswordReset(newPasswordReset)
    res.status(200).json({ message: "Password reset successful", newPasswordReset })
}
module.exports = {
    createPasswordReset,
    getPasswordResetById,
    updatePasswordReset,
    deletePasswordReset,
    getAllPasswordResets,
    findByEmail,
    requestPasswordReset,
    verifyResetToken,
    resetPassword,
}