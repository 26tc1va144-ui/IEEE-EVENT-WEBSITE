const Participant = require('../models/Participant');
const { generateRegistrationId } = require('../utils/generateId');
const { generateQRCode } = require('../utils/qrcode');
const { sendConfirmationEmail } = require('../utils/email');

/**
 * @route   POST /api/registration
 * @desc    Register a new participant (creates pending record + Razorpay order)
 */
const registerParticipant = async (req, res) => {
  try {
    const {
      name, email, phone, college, department, year,
      city, enrollmentNo, participantType, ieeeMember,
      dietaryRequirements, otherInfo, agreedToTerms
    } = req.body;

    // Check for duplicate email
    const existingParticipant = await Participant.findOne({ email: email.toLowerCase() });
    if (existingParticipant) {
      if (existingParticipant.paymentStatus === 'completed') {
        return res.status(400).json({
          success: false,
          message: 'This email is already registered for the workshop.'
        });
      }
      // If previous attempt was pending/failed, remove it so they can retry
      await Participant.deleteOne({ _id: existingParticipant._id });
    }

    // Generate unique registration ID
    let registrationId;
    let isUnique = false;
    while (!isUnique) {
      registrationId = generateRegistrationId();
      const existing = await Participant.findOne({ registrationId });
      if (!existing) isUnique = true;
    }

    // Create participant with pending payment
    const participant = await Participant.create({
      name,
      email: email.toLowerCase(),
      phone,
      college,
      department,
      year,
      city,
      enrollmentNo,
      participantType: participantType || 'Student',
      ieeeMember,
      dietaryRequirements: dietaryRequirements || '',
      otherInfo: otherInfo || '',
      agreedToTerms,
      registrationId,
      paymentStatus: 'pending'
    });

    res.status(201).json({
      success: true,
      message: 'Registration initiated. Proceed to payment.',
      data: {
        participantId: participant._id,
        registrationId: participant.registrationId,
        name: participant.name,
        email: participant.email,
        amount: 299
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'This email is already registered.'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Registration failed. Please try again.'
    });
  }
};

/**
 * @route   GET /api/registration/:registrationId
 * @desc    Get registration details by ID
 */
const getRegistration = async (req, res) => {
  try {
    const participant = await Participant.findOne({
      registrationId: req.params.registrationId
    }).select('-razorpaySignature');

    if (!participant) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found.'
      });
    }

    res.json({
      success: true,
      data: participant
    });
  } catch (error) {
    console.error('Get registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch registration details.'
    });
  }
};

/**
 * @route   POST /api/registration/complete
 * @desc    Mark registration as complete after payment verification
 *          (Called internally by payment controller — NOT directly by frontend)
 */
const completeRegistration = async (participantId) => {
  try {
    const participant = await Participant.findById(participantId);
    if (!participant) return null;

    // Generate QR code
    const qrCode = await generateQRCode({
      registrationId: participant.registrationId,
      name: participant.name,
      email: participant.email,
      paymentStatus: 'completed'
    });

    participant.paymentStatus = 'completed';
    participant.amountPaid = 299;
    participant.qrCode = qrCode;
    await participant.save();

    // Send confirmation email (non-blocking)
    sendConfirmationEmail(participant).catch(err =>
      console.error('Email error (non-blocking):', err.message)
    );

    return participant;
  } catch (error) {
    console.error('Complete registration error:', error);
    return null;
  }
};

module.exports = {
  registerParticipant,
  getRegistration,
  completeRegistration
};
