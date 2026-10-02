const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { loginLimiter } = require('../middleware/rateLimiter');
const {
  loginAdmin,
  getDashboardStats,
  getParticipants,
  exportParticipants,
  getSpeakers,
  createSpeaker,
  updateSpeaker,
  deleteSpeaker,
  getScheduleItems,
  createScheduleItem,
  updateScheduleItem,
  deleteScheduleItem,
  updateEvent
} = require('../controllers/adminController');

// Auth
router.post('/login', loginLimiter, loginAdmin);

// Dashboard (protected)
router.get('/dashboard', protect, getDashboardStats);

// Participants (protected)
router.get('/participants', protect, getParticipants);
router.get('/participants/export', protect, exportParticipants);

// Speakers (protected)
router.get('/speakers', protect, getSpeakers);
router.post('/speakers', protect, createSpeaker);
router.put('/speakers/:id', protect, updateSpeaker);
router.delete('/speakers/:id', protect, deleteSpeaker);

// Schedule (protected)
router.get('/schedule', protect, getScheduleItems);
router.post('/schedule', protect, createScheduleItem);
router.put('/schedule/:id', protect, updateScheduleItem);
router.delete('/schedule/:id', protect, deleteScheduleItem);

// Event (protected)
router.put('/event', protect, updateEvent);

module.exports = router;
