const crypto = require('crypto');
const Participant = require('../models/Participant');
const { completeRegistration } = require('./registrationController');

/**
 * Initialize Razorpay only when credentials are available.
 * This allows the server to start without Razorpay in development.
 */
let razorpayInstance = null;
const getRazorpay = () => {
  if (razorpayInstance) return razorpayInstance;
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    return null;
  }
  const Razorpay = require('razorpay');
  razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  });
  return razorpayInstance;
};

/**
 * @route   POST /api/payment/create-order
 * @desc    Create a Razorpay order for a registered participant
 */
const createOrder = async (req, res) => {
  try {
    const { participantId } = req.body;

    const participant = await Participant.findById(participantId);
    if (!participant) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found. Please register first.'
      });
    }

    if (participant.paymentStatus === 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Payment already completed for this registration.'
      });
    }

    const razorpay = getRazorpay();

    // --- DEV MODE: simulate payment when Razorpay is not configured ---
    if (!razorpay) {
      console.warn('Razorpay not configured — using dev mode simulation');

      // Simulate successful payment
      const devOrderId = `dev_order_${Date.now()}`;
      participant.razorpayOrderId = devOrderId;
      await participant.save();

      return res.json({
        success: true,
        devMode: true,
        data: {
          orderId: devOrderId,
          amount: 29900, // paise
          currency: 'INR',
          participantId: participant._id,
          registrationId: participant.registrationId,
          prefill: {
            name: participant.name,
            email: participant.email,
            contact: participant.phone
          }
        }
      });
    }

    // --- PRODUCTION: create real Razorpay order ---
    const order = await razorpay.orders.create({
      amount: 29900, // ₹299 in paise
      currency: 'INR',
      receipt: participant.registrationId,
      notes: {
        registrationId: participant.registrationId,
        participantName: participant.name,
        email: participant.email
      }
    });

    participant.razorpayOrderId = order.id;
    await participant.save();

    res.json({
      success: true,
      data: {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        participantId: participant._id,
        registrationId: participant.registrationId,
        keyId: process.env.RAZORPAY_KEY_ID,
        prefill: {
          name: participant.name,
          email: participant.email,
          contact: participant.phone
        }
      }
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create payment order.'
    });
  }
};

/**
 * @route   POST /api/payment/verify
 * @desc    Verify Razorpay payment signature (server-side only)
 */
const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      participantId
    } = req.body;

    const participant = await Participant.findById(participantId);
    if (!participant) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found.'
      });
    }

    // --- DEV MODE: auto-verify when Razorpay is not configured ---
    if (!process.env.RAZORPAY_KEY_SECRET || !razorpay_signature) {
      console.warn('Dev mode — auto-verifying payment');
      participant.razorpayPaymentId = razorpay_payment_id || `dev_pay_${Date.now()}`;
      await participant.save();

      const completed = await completeRegistration(participant._id);
      if (!completed) {
        return res.status(500).json({
          success: false,
          message: 'Failed to complete registration.'
        });
      }

      return res.json({
        success: true,
        message: 'Registration completed successfully!',
        data: {
          registrationId: completed.registrationId,
          name: completed.name,
          email: completed.email,
          paymentStatus: completed.paymentStatus,
          qrCode: completed.qrCode
        }
      });
    }

    // --- PRODUCTION: verify Razorpay signature ---
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      participant.paymentStatus = 'failed';
      await participant.save();
      return res.status(400).json({
        success: false,
        message: 'Payment verification failed. Signature mismatch.'
      });
    }

    // Signature valid — complete registration
    participant.razorpayPaymentId = razorpay_payment_id;
    participant.razorpaySignature = razorpay_signature;
    await participant.save();

    const completed = await completeRegistration(participant._id);
    if (!completed) {
      return res.status(500).json({
        success: false,
        message: 'Payment verified but failed to complete registration. Contact support.'
      });
    }

    res.json({
      success: true,
      message: 'Payment verified and registration completed!',
      data: {
        registrationId: completed.registrationId,
        name: completed.name,
        email: completed.email,
        paymentStatus: completed.paymentStatus,
        qrCode: completed.qrCode
      }
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Payment verification failed.'
    });
  }
};

module.exports = { createOrder, verifyPayment };
