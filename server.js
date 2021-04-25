const path = require('path');
const minimist = require('minimist');
const express = require('express');

const app = express();

const port = minimist(process.argv.slice(2)).port;

app.use(express.static("."));

app.listen(port);