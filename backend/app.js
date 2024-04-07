const express = require('express');
const sequelize = require('./models/database');
const cors = require('cors');
const models = require('./models');
const authRoutes = require('./routes/AuthRouter');
const userRoutes = require('./routes/UserRouter');
const studyMaterialRoutes = require('./routes/StudyMaterialRouter');
const socketIo = require('./services/socket');
const http = require('http');

const app = express();
const server = http.createServer(app);
socketIo.init(server);
require('dotenv').config();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routers
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/study-materials', studyMaterialRoutes);

sequelize.sync({ force: true, alter: true })
    .then(() => {
        console.log('Database is synced');

        // Start the server
        server.listen(port, () => {
            console.log('Server running on port', port);              
        });
    })
    .catch((error) => {
        console.error('Unable to sync database:', error);
    });