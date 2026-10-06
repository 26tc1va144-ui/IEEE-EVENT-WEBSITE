// Load .env from project root when running locally; on Render env vars are injected directly
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// Import routes
const registrationRoutes = require('./routes/registration');
const paymentRoutes = require('./routes/payment');
const adminRoutes = require('./routes/admin');
const eventRoutes = require('./routes/event');

const app = express();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false // allow inline scripts/styles from React
}));
app.use(cors({ origin: '*', credentials: true }));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// API routes (must come before static serving)
app.use('/api/registration', registrationRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/event', eventRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve frontend static files
const distPath = path.join(__dirname, '../client/dist');
app.use(express.static(distPath));

// For any non-API route, serve the React app (React Router will handle it)
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : err.message
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
