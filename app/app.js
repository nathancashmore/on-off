const boom = require('boom');
const express = require('express');
const logger = require('heroku-logger');
const bodyParser = require('body-parser');
const config = require('getconfig');

const indexRouter = require('./routes/index');
const iftttRouter = require('./routes/ifttt');

const app = module.exports = express();

// Global variables
const iftttAuthCode = process.env.IFTTT_AUTH || config.IFTTT_AUTH;

app.locals.iftttAuthCode = iftttAuthCode;
logger.info(`IFTTT Auth code set to ${iftttAuthCode}`);

// Routes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/ifttt/v1', iftttRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  logger.error(`Unable to find route for [${req.method}] - ${req.url}`);
  next(boom.notFound());
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  boom.boomify(err);
  logger.error(`Problem occurred at [${req.method}] - ${req.url} - ${err}`);

  res.status(err.output.statusCode);
  res.json({ error: err });
});

module.exports = app;
