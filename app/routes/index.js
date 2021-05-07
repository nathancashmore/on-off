const express = require('express');
const { Gpio } = require('onoff');

const router = express.Router();
const LED = new Gpio(4, 'out'); // use GPIO pin 4, and specify that it is output
const ON = 1;
const OFF = 0;

router.get('/status', async (req, res) => {
  res.json({ status: 'OK' });
});

router.post('/actions/switch', async (req, res) => {
  res.json({ status: 'OK' });
});

router.get('/on', async (req, res) => {
  LED.writeSync(ON);
  res.json({ status: 'ON' });
});

router.get('/off', async (req, res) => {
  LED.writeSync(OFF);
  res.json({ status: 'OFF' });
});

module.exports = router;
