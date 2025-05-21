const nodemailer = require("nodemailer")
require("dotenv").config()

const createTransporter = async () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  })
}

// Update the sendPasswordResetEmail function to send only the token
const sendPasswordResetEmail = async (email, token, name) => {
  const transporter = await createTransporter()
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Password Reset Request",
    html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Password Reset Request</h2>
            <p>Hello ${name},</p>
            <p>We received a request to reset your password. If you didn't make this request, you can ignore this email.</p>
            <p>To reset your password, please use the token below:</p>
            <div style="text-align: center; margin: 30px 0;">
                <p style="font-size: 18px; font-weight: bold; padding: 12px; background-color: #f5f5f5; border: 1px solid #ddd; border-radius: 4px;">${token}</p>
            </div>
            <p>This token will expire in 10 hours.</p>
            <p>If you have any questions, please contact our support team.</p>
            <p>Best regards,<br>Tour Booking Team</p>
        </div>
        `,
  }
  try {
    console.log("Sending email to", email)
    const info = await transporter.sendMail(mailOptions)
    console.log("Password reset email sent successfully: ", info.messageId)
    return info
  } catch (error) {
    console.error("Error sending email:", error)
    throw new Error("Failed to send email: " + error.message)
  }
}

module.exports = {
  sendPasswordResetEmail,
}
