const express = require('express');
const router = express.Router();
const { registerParticipant, getRegistration } = require('../controllers/registrationController');
const { registrationRules, validate } = require('../middleware/validate');
const { registrationLimiter } = require('../middleware/rateLimiter');

// POST /api/registration — Register a new participant
router.post('/', registrationLimiter, registrationRules, validate, registerParticipant);

// GET /api/registration/:registrationId — Get registration details
router.get('/:registrationId', getRegistration);

module.exports = router;
