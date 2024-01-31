const express = require('express');
const morgan = require('morgan');
const fs = require('fs')

const app = express();

// Middleware
app.use(morgan('dev'));

// GET route for /
app.get('/', (req, res) => {
  res.status(200).send('Hello, welcome to the homepage!');
});

// GET route for /data
app.get('/data', (req, res) => {
    const data = [
      {
      "todoItemId": 0,
      "name": "an item",
      "priority": 3,
      "completed": false,
    },
    {
      "todoItemId": 1,
      "name": "another item",
      "priority": 2,
      "completed": false,
    },
    {
      "todoItemId": 2,
      "name": "a done item",
      "priority": 1,
      "completed": true,
    },
    ];

  res.json(data);
});

// Export the app
module.exports = app;