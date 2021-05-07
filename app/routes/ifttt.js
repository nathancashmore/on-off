const express = require('express');

const router = express.Router();

router.get('/status', async (req, res) => {
  res.json({ status: 'OK' });
});

router.post('/actions/switch', async (req, res) => {
  res.json({ status: 'OK' });
});

module.exports = router;
