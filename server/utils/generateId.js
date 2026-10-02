const crypto = require('crypto');

/**
 * Generates a unique registration ID
 * Format: IEEE-WS-XXXXXX (6 uppercase alphanumeric characters)
 */
const generateRegistrationId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const randomBytes = crypto.randomBytes(6);
  let id = '';
  for (let i = 0; i < 6; i++) {
    id += chars[randomBytes[i] % chars.length];
  }
  return `IEEE-WS-${id}`;
};

module.exports = { generateRegistrationId };
