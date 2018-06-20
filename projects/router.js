'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const { Project } = require('./models');

const router = express.Router();

const jsonParser = bodyParser.json();

const {Project} = require('./models')

//routes
router.get('/', jsonParser, (req, res) => {

});

module.exports = {router};
