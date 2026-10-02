const express = require('express');
const router = express.Router();
const { createOrder, verifyPayment } = require('../controllers/paymentController');
const { apiLimiter } = require('../middleware/rateLimiter');

// POST /api/payment/create-order — Create Razorpay order
router.post('/create-order', apiLimiter, createOrder);

// POST /api/payment/verify — Verify Razorpay payment signature
router.post('/verify', apiLimiter, verifyPayment);

module.exports = router;
