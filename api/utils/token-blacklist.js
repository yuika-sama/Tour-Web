const tokenBlacklist = new Map()

const CLEANUP_INTERVAL = 1000 * 60 * 60 * 24; // 24 hours

const addToBlacklist = (token, exp) => {
    const expiryTime = exp ? new Date(exp * 1000).getTime() : Date.now() + CLEANUP_INTERVAL;
    tokenBlacklist.set(token, expiryTime);
};

const isBlacklisted = (token) => {
    return tokenBlacklist.has(token);
};

const cleanupBlacklist = () => {
    const now = Date.now();
    for (const [token, timestamp] of tokenBlacklist.entries()) {
        if (now - timestamp > CLEANUP_INTERVAL) {
            tokenBlacklist.delete(token);
        }
    }
};

setInterval(cleanupBlacklist, CLEANUP_INTERVAL / 24);

module.exports = { addToBlacklist, isBlacklisted };