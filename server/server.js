const debug = require('debug')('server');
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, '../client/public')));

app.listen(PORT, () => debug(`Server is up and running on ${PORT}...`));
