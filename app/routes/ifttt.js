const express = require('express');
const logger = require('heroku-logger');

const router = express.Router();

function validateRequest(req) {
  return req.get('IFTTT-Service-Key') === req.app.locals.iftttAuthCode;
}

router.get('/status', async (req, res) => {
  if (validateRequest(req) === true) {
    res.json({ status: 'OK' });
  } else {
    res.status(401);
    res.json({ error: 'Invalid IFTTT-Service-Key' });
  }
});

router.post('/test/setup', async (req, res) => {
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

router.post('/actions/switch', async (req, res) => {
  const { state } = req.body.actionFields;
  logger.info(`IFTTT call received to switch to ${state}`);

  // Switch based on state

  res.json({ data: [{ id: '11111', url: 'http://apps.staticvoid.co.uk:4000' }] });
});


module.exports = router;
