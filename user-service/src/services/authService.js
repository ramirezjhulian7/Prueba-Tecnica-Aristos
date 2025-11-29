const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const SECRET_KEY = process.env.JWT_SECRET || 'supersecretkey';

/**
 * Service for handling user authentication.
 */
class AuthService {
    /**
     * Register a new user.
     * @param {string} username - The username.
     * @param {string} password - The password.
     * @returns {Promise<Object>} The created user object (without password).
     * @throws {Error} If username already exists.
     */
    async register(username, password) {
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            const error = new Error('Username already exists');
            error.statusCode = 409;
            throw error;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password_hash: hashedPassword });
        return { id: user.id, username: user.username };
    }

    /**
     * Authenticate a user.
     * @param {string} username - The username.
     * @param {string} password - The password.
     * @returns {Promise<Object>} The JWT token and user info.
     * @throws {Error} If credentials are invalid.
     */
    async login(username, password) {
        const user = await User.findOne({ where: { username } });

        if (!user || !(await bcrypt.compare(password, user.password_hash))) {
            const error = new Error('Invalid credentials');
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({ userId: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
        return { token, username: user.username, userId: user.id };
    }
}

module.exports = new AuthService();
