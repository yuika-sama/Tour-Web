const PasswordReset = require("../models/password_resets.model")
const User = require("../models/users.model")
const bcrypt = require("bcrypt")
const crypto = require("crypto")
const { sendPasswordResetEmail } = require("../utils/email-service")
const { TokenExpiredError } = require("jsonwebtoken")
require("dotenv").config()

const createPasswordReset = async (req, res) => {
  const { email, token, expires_at } = req.body
  if (!email) {
    return res.status(400).json({ message: "Email is required" })
  }
  if (!token) {
    return res.status(400).json({ message: "Token is required" })
  }
  if (!expires_at) {
    return res.status(400).json({ message: "Expires at is required" })
  }
  const expiresAt = new Date(expires_at)
  const newPasswordReset = await PasswordReset.createPasswordReset({ email, token, expires_at: expiresAt })
  if (!newPasswordReset) {
    return res.status(400).json({ message: "Failed to create password reset" })
  }
  res.status(201).json(newPasswordReset)
}

const getPasswordResetById = async (req, res) => {
  const { resetId } = req.params
  if (!resetId) {
    return res.status(400).json({ message: "Reset id is required" })
  }
  const passwordReset = await PasswordReset.getPasswordResetById(resetId)
  res.status(200).json(passwordReset)
}

const updatePasswordReset = async (req, res) => {
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
  passwordReset.updated_at = new Date()
  passwordReset.expires_at = passwordReset.expiresAt
  const updatedPasswordReset = await PasswordReset.updatePasswordReset(resetId, passwordReset)
  if (!updatedPasswordReset) {
    return res.status(400).json({ message: "Failed to update password reset" })
  }
  res.status(200).json(updatedPasswordReset)
}

const deletePasswordReset = async (req, res) => {
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

const getAllPasswordResets = async (req, res) => {
  const passwordResets = await PasswordReset.getAllPasswordResets()
  if (!passwordResets) {
    return res.status(404).json({ message: "Password resets not found" })
  }
  res.status(200).json(passwordResets)
}

const findByEmail = async (req, res) => {
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

// Update the requestPasswordReset function to only send the token
const requestPasswordReset = async (req, res) => {
  const { email } = req.body
  if (!email) {
    return res.status(400).json({ message: "Email is required" })
  }
  try {
    const user = await User.getUserByEmail(email)
    if (!user || user.length === 0) {
      return res.status(404).json({ message: "User not found" })
    }
    const token = crypto.randomBytes(32).toString("hex")
    const expiresAt = new Date()
    expiresAt.setHours(expiresAt.getHours() + 1000)
    await PasswordReset.deleteByEmail(email)
    // const passwordReset = await PasswordReset.createPasswordReset({ email, token, expires_at: expiresAt })
    const passwordResetObject = await PasswordReset.createPasswordReset({ email, token, expires_at: expiresAt })
    console.log(passwordResetObject)

    // Send only the token instead of a reset URL
    try {
      await sendPasswordResetEmail(email, token, user[0].full_name)
    } catch (error) {
      return res.status(400).json({ message: "Failed to send email: " + error.message })
    }
    res.status(200).json({ message: "Password reset token sent successfully" })
  } catch (error) {
    return res.status(400).json({ message: "Failed to request password reset: " + error.message })
  }
}

// Update the resetPassword function to find user by token
const resetPassword = async (req, res) => {
  const { token, newPassword, confirmPassword } = req.body

  if (!token || !newPassword || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required" })
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" })
  }

  if (newPassword.length < 8 || !/\d/.test(newPassword) || !/[a-zA-Z]/.test(newPassword)) {
    return res
      .status(400)
      .json({ message: "Password must be at least 8 characters long and contain at least one number and one letter" })
  }

  // Find the password reset record by token
  const passwordReset = await PasswordReset.findByToken(token)
  if (!passwordReset) {
    return res.status(404).json({ message: "Invalid or expired token" })
  }

  // Check if token is expired
  const now = new Date()
  if (now > new Date(passwordReset.expires_at)) {
    return res.status(400).json({ message: "Token expired" })
  }

  // Get user by email from the password reset record
  const users = await User.getUserByEmail(passwordReset.email)
  if (!users || users.length === 0) {
    return res.status(404).json({ message: "User not found" })
  }

  const user = users[0]

  // Hash the new password and update user
  const hashedPassword = await bcrypt.hash(newPassword, 10)
  const updatedUser = {
    user_id: user.user_id,
    full_name: user.full_name,
    email: user.email,
    password_hash: hashedPassword,
    phone_number: user.phone_number,
    auth_provider: user.auth_provider,
    provider_id: user.provider_id,
    updated_at: new Date(),
  }

  await User.updateUser(user.user_id, updatedUser)

  // Invalidate the token by marking it as used
  const newToken = "USED-" + crypto.randomBytes(32).toString("hex")
  const newExpiresAt = new Date()
  newExpiresAt.setHours(newExpiresAt.getHours() - 1) // Expire immediately

  await PasswordReset.deleteByToken(token)
  await PasswordReset.createPasswordReset({
    email: passwordReset.email,
    token: newToken,
    expires_at: newExpiresAt,
  })

  res.status(200).json({ message: "Password reset successful" })
}

const findByToken = async (req, res) => {
  const { token } = req.params
  if (!token) {
    return res.status(400).json({ message: "Token is required" })
  }
}

const verifyResetToken = async (req, res) => {
  const { token } = req.params
  if (!token) {
    return res.status(400).json({ message: "Token is required" })
  }
  const passwordReset = await PasswordReset.findByToken(token)
  if (!passwordReset) {
    return res.status(404).json({ message: "Invalid or expired token" })
  }
  const now = new Date()
  if (now > new Date(passwordReset.expires_at)) {
    return res.status(400).json({ message: "Token expired" })
  }
  res.status(200).json({ message: "Token is valid" })
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
  findByToken,
}
