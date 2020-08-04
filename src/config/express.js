const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('../api/routes/v1');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/v1', routes);

module.exports = app;
