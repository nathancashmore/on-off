const express = require('express');

const router = express.Router();

router.get('/on', async (req, res) => {
  res.json({ status: 'ON' });
});

router.get('/off', async (req, res) => {
  res.json({ status: 'OFF' });
});

module.exports = router;
