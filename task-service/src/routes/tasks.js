const express = require('express');
const taskController = require('../controllers/taskController');
const authenticateToken = require('../middleware/auth');
const { validate, taskSchema } = require('../middleware/validation');
const router = express.Router();

router.use(authenticateToken);

router.post('/', validate(taskSchema), taskController.create);
router.get('/', taskController.getAll);
router.put('/:id', validate(taskSchema), taskController.update);
router.delete('/:id', taskController.delete);

module.exports = router;
