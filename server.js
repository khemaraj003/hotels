const express = require('express');
const app = express();
const db = require('./db'); // Ensure this file initializes your MongoDB connection
const bodyParser = require('body-parser');
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');
require('dotenv').config();
// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Use the person routes
app.use('/person', personRoutes);

// Use the menu routes
app.use('/menu', menuRoutes);

// Basic route for testing
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Additional route for testing
app.get('/abc', (req, res) => {
    res.send('Hello World abc');
});

// Start the server
const PORT = process.env.PORT||3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
