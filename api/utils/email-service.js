const nodemailer = require('nodemailer');

const createTransporter = async () => {
    if(!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        throw new Error('Email credentials are not set');
    }
    if (!process.env.NODE_ENV === 'production') {
        return nodemailer.createTransport({
           host: process.env.EMAIL_HOST,
           port: process.env.EMAIL_PORT,
           secure: process.env.EMAIL_SECURE === 'true',
           auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
           }
        }); 
    }
    return nodemailer.createTransport({
        host: 'sandbox.smtp.mailtrap.io',
        port: 2525,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
};

const sendPasswordResetEmail = async (email, resetUrl, name) => {
    const transporter = await createTransporter();
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Password Reset Request',
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Password Reset Request</h2>
            <p>Hello ${name},</p>
            <p>We received a request to reset your password. If you didn't make this request, you can ignore this email.</p>
            <p>To reset your password, please click the button below:</p>
            <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">Reset Password</a>
            </div>
            <p>Or copy and paste this link in your browser:</p>
            <p style="word-break: break-all;">${resetUrl}</p>
            <p>This link will expire in 1 hour.</p>
            <p>If you have any questions, please contact our support team.</p>
            <p>Best regards,<br>Tour Booking Team</p>
        </div>
        `,
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log('Password reset email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
};

module.exports = {
    sendPasswordResetEmail
};  