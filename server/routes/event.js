const express = require('express');
const router = express.Router();
const { getEvent, getPublicSpeakers, getPublicSchedule } = require('../controllers/eventController');

// Public event routes
router.get('/', getEvent);
router.get('/speakers', getPublicSpeakers);
router.get('/schedule', getPublicSchedule);

module.exports = router;
