const express = require('express');
const router = express.Router();
const { registerAdmin, loginUser, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// POST /api/auth/register - Create initial admin (one-time use)
router.post('/register', registerAdmin);

// POST /api/auth/login - User login
router.post('/login', loginUser);

// GET /api/auth/me - Get current user profile (Protected)
router.get('/me', protect, getMe);

module.exports = router;
