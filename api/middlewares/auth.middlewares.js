const jwt = require('jsonwebtoken');
const { Blacklist } = require('../utils/token-blacklist');

const authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        if (isBlacklisted(token)) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(403).json({ message: 'Forbidden' });
        }
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = {
    authenticateToken
};