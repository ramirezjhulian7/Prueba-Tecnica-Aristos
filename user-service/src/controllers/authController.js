const authService = require('../services/authService');

class AuthController {
    async register(req, res, next) {
        try {
            const { username, password } = req.body;
            const result = await authService.register(username, password);
            res.status(201).json({ message: 'User registered successfully', userId: result.id });
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const { username, password } = req.body;
            const result = await authService.login(username, password);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AuthController();
