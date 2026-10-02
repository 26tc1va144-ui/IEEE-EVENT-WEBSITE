const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: 'International Workshop 2026'
  },
  description: {
    type: String,
    required: true,
    default: 'International Workshop organized by IEEE RAS & IAS at MITS DU'
  },
  date: {
    type: String,
    required: true,
    default: 'To Be Announced'
  },
  startTime: {
    type: String,
    required: true,
    default: '09:00 AM'
  },
  endTime: {
    type: String,
    required: true,
    default: '05:00 PM'
  },
  venue: {
    type: String,
    required: true,
    default: 'MITS DU (Madhav Institute of Technology & Science, Deemed University)'
  },
  venueAddress: {
    type: String,
    default: 'Gwalior, Madhya Pradesh, India'
  },
  registrationFee: {
    type: Number,
    required: true,
    default: 299
  },
  currency: {
    type: String,
    default: 'INR'
  },
  organizers: [{
    name: String,
    shortName: String,
    logo: String
  }],
  contactInfo: {
    coordinatorName: { type: String, default: 'Event Coordinator' },
    email: { type: String, default: 'contact@ieeworkshop.com' },
    phone: { type: String, default: '+91-XXXXXXXXXX' },
    rasContact: { type: String, default: 'IEEE RAS Contact' },
    iasContact: { type: String, default: 'IEEE IAS Contact' },
    mitsContact: { type: String, default: 'MITS DU Contact' }
  },
  socialLinks: {
    website: { type: String, default: '' },
    twitter: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    instagram: { type: String, default: '' },
    facebook: { type: String, default: '' }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  maxParticipants: {
    type: Number,
    default: 500
  },
  registrationOpen: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);
