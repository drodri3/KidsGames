const express = require('express');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT;

app.get('/', function(req, res){

    res.set('Content-Type', 'text/html; charset=utf-8');
    res.send("<h1>Hello from Node App</h1>");
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});