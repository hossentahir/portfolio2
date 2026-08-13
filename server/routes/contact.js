const express = require('express');
const router = express.Router();
const {
  createContact,
  getContacts,
  toggleReadStatus,
  deleteContact
} = require('../controllers/contactController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public route
router.post('/', createContact);

// Protected Admin routes
router.get('/', protect, admin, getContacts);
router.put('/:id/read', protect, admin, toggleReadStatus);
router.delete('/:id', protect, admin, deleteContact);

module.exports = router;
