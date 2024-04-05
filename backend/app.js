const express = require('express');
const sequelize = require('./models/database');
const cors = require('cors');
const models = require('./models');
const authRoutes = require('./routes/AuthRouter');
const userRoutes = require('./routes/UserRouter');
const studyMaterialRoutes = require('./routes/StudyMaterialRouter');

const app = express();
require('dotenv').config();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routers
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/study-materials', studyMaterialRoutes);

sequelize.sync({ force: false })
    .then(() => {
        sequelize.authenticate();
        console.log('Database is synced');

        // Start the server
        app.listen(port, () => {
            console.log('Server running on port', port);              
        });
    })
    .catch((error) => {
        console.error('Unable to sync database:', error);
    });