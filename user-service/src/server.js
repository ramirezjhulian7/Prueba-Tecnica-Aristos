require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./utils/logger');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

app.use('/auth', authRoutes);

app.use(errorHandler);

sequelize.sync().then(() => {
    logger.info('Database connected');
    app.listen(PORT, () => {
        logger.info(`User Service running on port ${PORT}`);
    });
}).catch(err => {
    logger.error('Database connection failed:', err);
});
