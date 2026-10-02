const { body, validationResult } = require('express-validator');

// Validation rules for registration
const registrationRules = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 100 }).withMessage('Name cannot exceed 100 characters')
    .escape(),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email')
    .normalizeEmail(),
  body('phone')
    .trim()
    .notEmpty().withMessage('Phone number is required')
    .matches(/^[+]?[\d\s-]{7,15}$/).withMessage('Please enter a valid phone number'),
  body('college')
    .trim()
    .notEmpty().withMessage('College/University name is required')
    .escape(),
  body('department')
    .trim()
    .notEmpty().withMessage('Department is required')
    .escape(),
  body('year')
    .trim()
    .notEmpty().withMessage('Year/Semester is required')
    .escape(),
  body('city')
    .trim()
    .notEmpty().withMessage('City is required')
    .escape(),
  body('enrollmentNo')
    .trim()
    .notEmpty().withMessage('Enrollment number is required')
    .escape(),
  body('participantType')
    .optional()
    .isIn(['Student'])
    .withMessage('Invalid participant type'),
  body('ieeeMember')
    .notEmpty().withMessage('IEEE membership status is required')
    .isIn(['Yes', 'No']).withMessage('Invalid IEEE membership status'),
  body('agreedToTerms')
    .equals('true').withMessage('You must agree to the terms and conditions'),
  body('dietaryRequirements')
    .optional()
    .trim()
    .escape(),
  body('otherInfo')
    .optional()
    .trim()
    .escape()
];

// Handle validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  next();
};

module.exports = { registrationRules, validate };
