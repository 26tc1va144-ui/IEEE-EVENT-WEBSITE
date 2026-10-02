const QRCode = require('qrcode');

/**
 * Generate a QR code as a data URL (base64 PNG)
 * Contains registration details for verification at the venue.
 */
const generateQRCode = async (data) => {
  try {
    const qrData = JSON.stringify({
      registrationId: data.registrationId,
      name: data.name,
      email: data.email,
      event: 'IEEE RAS & IAS International Workshop',
      paymentStatus: data.paymentStatus
    });

    const qrCodeDataUrl = await QRCode.toDataURL(qrData, {
      width: 300,
      margin: 2,
      color: {
        dark: '#0a1628',
        light: '#ffffff'
      },
      errorCorrectionLevel: 'H'
    });

    return qrCodeDataUrl;
  } catch (error) {
    console.error('QR Code generation error:', error);
    return null;
  }
};

module.exports = { generateQRCode };
