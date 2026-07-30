const express = require('express');
const router = express.Router();

// @route   GET /api/health
// @desc    Health check endpoint
// @access  Public
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Server is healthy and running',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
