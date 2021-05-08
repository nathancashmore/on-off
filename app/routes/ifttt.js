const express = require('express');
const logger = require('heroku-logger');
const _ = require('lodash');
const { ErrorWithStatus } = require('../model/httpError');

const router = express.Router();

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

  res.json({
    data: [
      { id: '11111', url: 'http://apps.staticvoid.co.uk:4000' }
    ]
  });
});


module.exports = router;
