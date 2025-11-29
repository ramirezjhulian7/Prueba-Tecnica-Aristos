const Task = require('../models/Task');

/**
 * Service for handling task management.
 */
class TaskService {
    /**
     * Create a new task.
     * @param {number} userId - The ID of the user creating the task.
     * @param {Object} taskData - The task data.
     * @returns {Promise<Object>} The created task.
     */
    async createTask(userId, taskData) {
        return await Task.create({
            ...taskData,
            userId,
        });
    }

    /**
     * Get all tasks for a user.
     * @param {number} userId - The user ID.
     * @returns {Promise<Array>} List of tasks.
     */
    async getTasks(userId) {
        return await Task.findAll({ where: { userId } });
    }

    /**
     * Update a task.
     * @param {number} userId - The user ID.
     * @param {number} taskId - The task ID.
     * @param {Object} updates - The updates to apply.
     * @returns {Promise<Object>} The updated task.
     * @throws {Error} If task not found.
     */
    async updateTask(userId, taskId, updates) {
        const task = await Task.findOne({ where: { id: taskId, userId } });
        if (!task) {
            const error = new Error('Task not found');
            error.statusCode = 404;
            throw error;
        }

        Object.assign(task, updates);
        return await task.save();
    }

    /**
     * Delete a task.
     * @param {number} userId - The user ID.
     * @param {number} taskId - The task ID.
     * @returns {Promise<Object>} Success message.
     * @throws {Error} If task not found.
     */
    async deleteTask(userId, taskId) {
        const task = await Task.findOne({ where: { id: taskId, userId } });
        if (!task) {
            const error = new Error('Task not found');
            error.statusCode = 404;
            throw error;
        }

        await task.destroy();
        return { message: 'Task deleted successfully' };
    }
}

module.exports = new TaskService();
