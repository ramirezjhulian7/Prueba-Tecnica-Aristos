const taskService = require('../services/taskService');

class TaskController {
    async create(req, res, next) {
        try {
            const task = await taskService.createTask(req.user.userId, req.body);
            res.status(201).json(task);
        } catch (error) {
            next(error);
        }
    }

    async getAll(req, res, next) {
        try {
            const tasks = await taskService.getTasks(req.user.userId);
            res.json(tasks);
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const task = await taskService.updateTask(req.user.userId, req.params.id, req.body);
            res.json(task);
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const result = await taskService.deleteTask(req.user.userId, req.params.id);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new TaskController();
