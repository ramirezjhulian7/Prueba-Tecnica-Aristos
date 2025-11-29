const Joi = require('joi');

const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        const message = error.details.map((detail) => detail.message).join(', ');
        return res.status(400).json({ error: message });
    }
    next();
};

const taskSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().allow('').optional(),
    status: Joi.string().valid('pending', 'in_progress', 'completed').optional(),
});

module.exports = {
    validate,
    taskSchema,
};
