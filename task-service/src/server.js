require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const taskRoutes = require('./routes/tasks');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./utils/logger');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

app.use('/tasks', taskRoutes);

app.use(errorHandler);

sequelize.sync().then(() => {
    logger.info('Database connected');
    app.listen(PORT, () => {
        logger.info(`Task Service running on port ${PORT}`);
    });
}).catch(err => {
    logger.error('Database connection failed:', err);
});
