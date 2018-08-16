// Dependencies
const express = require('express');
const bodyParser = require('body-parser');

// Sets up the express app
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Static directory to serve files from
app.use(express.static('public'));

// Routes are a function that take the express app as an argument
require('./routes')(app);

// Starts the server
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));