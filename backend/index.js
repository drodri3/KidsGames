const express = require('express');
const db = require('./config/db');
const routes = require('./routes/routes'); // Import the routes module
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Use the imported routes
app.use('/api/', routes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
