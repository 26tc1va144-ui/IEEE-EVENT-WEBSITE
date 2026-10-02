const mongoose = require('mongoose');

const speakerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Speaker name is required'],
    trim: true
  },
  designation: {
    type: String,
    required: [true, 'Designation is required'],
    trim: true
  },
  organization: {
    type: String,
    required: [true, 'Organization is required'],
    trim: true
  },
  image: {
    type: String,
    default: ''
  },
  biography: {
    type: String,
    default: ''
  },
  expertise: {
    type: String,
    default: ''
  },
  topic: {
    type: String,
    default: ''
  },
  order: {
    type: Number,
    default: 0
  },
  isVisible: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Speaker', speakerSchema);
