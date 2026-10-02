const Event = require('../models/Event');
const Speaker = require('../models/Speaker');
const Schedule = require('../models/Schedule');

/**
 * @route   GET /api/event
 * @desc    Get public event information
 */
const getEvent = async (req, res) => {
  try {
    let event = await Event.findOne();
    if (!event) {
      event = await Event.create({});
    }
    res.json({ success: true, data: event });
  } catch (error) {
    console.error('Get event error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch event details.' });
  }
};

/**
 * @route   GET /api/event/speakers
 * @desc    Get visible speakers
 */
const getPublicSpeakers = async (req, res) => {
  try {
    const speakers = await Speaker.find({ isVisible: true }).sort('order');
    res.json({ success: true, data: speakers });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch speakers.' });
  }
};

/**
 * @route   GET /api/event/schedule
 * @desc    Get visible schedule
 */
const getPublicSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.find({ isVisible: true }).sort('order');
    res.json({ success: true, data: schedule });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch schedule.' });
  }
};

module.exports = { getEvent, getPublicSpeakers, getPublicSchedule };
