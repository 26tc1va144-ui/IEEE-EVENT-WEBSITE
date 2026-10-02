const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [/^[+]?[\d\s-]{7,15}$/, 'Please enter a valid phone number']
  },
  college: {
    type: String,
    required: [true, 'College/University name is required'],
    trim: true
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    trim: true
  },
  year: {
    type: String,
    required: [true, 'Year/Semester is required'],
    trim: true
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true
  },
  enrollmentNo: {
    type: String,
    required: [true, 'Enrollment number is required'],
    trim: true
  },
  participantType: {
    type: String,
    required: true,
    default: 'Student',
    enum: ['Student']
  },
  ieeeMember: {
    type: String,
    required: true,
    enum: ['Yes', 'No']
  },
  dietaryRequirements: {
    type: String,
    trim: true,
    default: ''
  },
  otherInfo: {
    type: String,
    trim: true,
    default: ''
  },
  registrationId: {
    type: String,
    unique: true,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  razorpayOrderId: {
    type: String,
    default: null
  },
  razorpayPaymentId: {
    type: String,
    default: null
  },
  razorpaySignature: {
    type: String,
    default: null
  },
  amountPaid: {
    type: Number,
    default: 0
  },
  qrCode: {
    type: String,
    default: null
  },
  agreedToTerms: {
    type: Boolean,
    required: [true, 'You must agree to the terms and conditions'],
    default: false
  },
  registrationDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Prevent duplicate registrations with same email
participantSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model('Participant', participantSchema);
