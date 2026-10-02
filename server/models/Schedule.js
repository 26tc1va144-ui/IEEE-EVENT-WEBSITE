const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Schedule item title is required'],
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  speaker: {
    type: String,
    default: ''
  },
  startTime: {
    type: String,
    required: [true, 'Start time is required']
  },
  endTime: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    enum: ['registration', 'ceremony', 'session', 'talk', 'break', 'workshop', 'interactive', 'closing'],
    default: 'session'
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

module.exports = mongoose.model('Schedule', scheduleSchema);
