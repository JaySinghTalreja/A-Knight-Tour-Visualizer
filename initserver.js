const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');

app.use(morgan('dev'))
    .use('/', express.static(path.join(__dirname, '/')))
    .listen(3000, console.log('Server Started on Port 3000'));