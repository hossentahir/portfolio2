const express = require('express');
const router = express.Router();
const { createContact, getContacts } = require('../controllers/contactController');
const { protect, admin } = require('../middleware/authMiddleware');

// POST /api/contact - Submit contact form (Public)
router.post('/', createContact);

// GET /api/contact - List contact messages (Protected Admin)
router.get('/', protect, admin, getContacts);

module.exports = router;
