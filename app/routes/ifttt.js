const express = require('express');
const logger = require('heroku-logger');
const _ = require('lodash');
const { ErrorWithStatus } = require('../model/httpError');

// const { Gpio } = require('onoff');

const router = express.Router();

// const LED = new Gpio(4, 'out'); // use GPIO pin 4, and specify that it is output
// const ON = 1;
// const OFF = 0;

const IFTTT_ID = '12345';
const IFTTT_URL = 'http://apps.staticvoid.co.uk:4000';

/* eslint-disable consistent-return */

router.get('/status', async (req, res, next) => {
  if (req.get('IFTTT-Service-Key') !== req.app.locals.iftttAuthCode) {
    return next(ErrorWithStatus('Invalid IFTTT-Service-Key').unauthorized);
  }

  res.json({
    data: {
      status: 'OK'
    }
  });
});

router.post('/test/setup', async (req, res, next) => {
  if (req.get('IFTTT-Service-Key') !== req.app.locals.iftttAuthCode) {
    return next(ErrorWithStatus('Invalid IFTTT-Service-Key').unauthorized);
  }

  logger.info('IFTTT are about to carry out a test');
  res.json({
    data: {
      samples: {
        actions: {
          switch: {
            state: 'ON',
          },
        },
      },
    },
  });
});

router.post('/actions/switch', async (req, res, next) => {
  if (req.get('IFTTT-Service-Key') !== req.app.locals.iftttAuthCode) {
    return next(ErrorWithStatus('Invalid IFTTT-Service-Key').unauthorized);
  }

  if (_.isEmpty(req.body.actionFields)) {
    return next(ErrorWithStatus('Invalid actionFields').badRequest); // eslint-disable-line no-use-before-define
  }

  const { state } = req.body.actionFields;
  logger.info(`IFTTT call received to switch to ${state}`);

  // Switch based on state
  switch (state) {
    case 'ON':
      // LED.writeSync(ON);
      break;
    case 'OFF':
      // LED.writeSync(OFF);
      break;
    default:
      return next(ErrorWithStatus('Invalid state for action, must be ON or OFF').badRequest); // eslint-disable-line no-use-before-define
  }

  res.json({
    data: [
      { id: IFTTT_ID, url: IFTTT_URL, state }
    ]
  });
});


module.exports = router;
