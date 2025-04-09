const express = require('express');
const path = require('path');
const app = express();

// middleware to log the current time for each request
app.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
});

// middleware to log the request type (GET, POST, etc)
app.use('/request-type', (req, res, next) => {
    console.log('Request type: ', req.method);
    next();
});

// serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// use node modules
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

// default route to send the index.html file when someone visits the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// start the server
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
