const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Participant = require('../models/Participant');
const Event = require('../models/Event');
const Speaker = require('../models/Speaker');
const Schedule = require('../models/Schedule');

/**
 * @route   POST /api/admin/login
 * @desc    Admin login — returns JWT
 */
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password.'
      });
    }

    const admin = await Admin.findOne({ email }).select('+password');
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials.'
      });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials.'
      });
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.json({
      success: true,
      data: {
        token,
        admin: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role
        }
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed.'
    });
  }
};

/**
 * @route   GET /api/admin/dashboard
 * @desc    Get dashboard statistics
 */
const getDashboardStats = async (req, res) => {
  try {
    const totalRegistrations = await Participant.countDocuments();
    const completedPayments = await Participant.countDocuments({ paymentStatus: 'completed' });
    const pendingPayments = await Participant.countDocuments({ paymentStatus: 'pending' });
    const failedPayments = await Participant.countDocuments({ paymentStatus: 'failed' });
    const totalRevenue = completedPayments * 299;

    // Registrations by college
    const byCollege = await Participant.aggregate([
      { $match: { paymentStatus: 'completed' } },
      { $group: { _id: '$college', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 20 }
    ]);

    // Registrations by department
    const byDepartment = await Participant.aggregate([
      { $match: { paymentStatus: 'completed' } },
      { $group: { _id: '$department', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Recent registrations
    const recentRegistrations = await Participant.find({ paymentStatus: 'completed' })
      .sort({ registrationDate: -1 })
      .limit(10)
      .select('name email college department registrationId registrationDate');

    res.json({
      success: true,
      data: {
        totalRegistrations,
        completedPayments,
        pendingPayments,
        failedPayments,
        totalRevenue,
        byCollege,
        byDepartment,
        recentRegistrations
      }
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard statistics.'
    });
  }
};

/**
 * @route   GET /api/admin/participants
 * @desc    Get all participants with search & filters
 */
const getParticipants = async (req, res) => {
  try {
    const {
      search, college, department, paymentStatus,
      page = 1, limit = 50, sort = '-registrationDate'
    } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { registrationId: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { enrollmentNo: { $regex: search, $options: 'i' } }
      ];
    }

    if (college) query.college = { $regex: college, $options: 'i' };
    if (department) query.department = { $regex: department, $options: 'i' };
    if (paymentStatus) query.paymentStatus = paymentStatus;

    const total = await Participant.countDocuments(query);
    const participants = await Participant.find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .select('-razorpaySignature -qrCode');

    res.json({
      success: true,
      data: {
        participants,
        pagination: {
          total,
          page: parseInt(page),
          pages: Math.ceil(total / limit),
          limit: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get participants error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch participants.'
    });
  }
};

/**
 * @route   GET /api/admin/participants/export
 * @desc    Export participants as CSV
 */
const exportParticipants = async (req, res) => {
  try {
    const { paymentStatus } = req.query;
    const query = {};
    if (paymentStatus) query.paymentStatus = paymentStatus;

    const participants = await Participant.find(query)
      .sort('-registrationDate')
      .select('-razorpaySignature -qrCode -__v');

    const headers = [
      'Registration ID', 'Name', 'Email', 'Phone', 'College', 'Department',
      'Year', 'Enrollment No', 'City', 'Participant Type', 'IEEE Member', 'Payment Status',
      'Amount Paid', 'Registration Date'
    ];

    const csvRows = [headers.join(',')];
    participants.forEach(p => {
      csvRows.push([
        p.registrationId,
        `"${p.name}"`,
        p.email,
        p.phone,
        `"${p.college}"`,
        `"${p.department}"`,
        p.year,
        p.enrollmentNo || '',
        `"${p.city}"`,
        p.participantType,
        p.ieeeMember,
        p.paymentStatus,
        p.amountPaid,
        new Date(p.registrationDate).toISOString()
      ].join(','));
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=ieee-workshop-participants.csv');
    res.send(csvRows.join('\n'));
  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to export participants.'
    });
  }
};

// ----- SPEAKER CRUD -----

const getSpeakers = async (req, res) => {
  try {
    const speakers = await Speaker.find().sort('order');
    res.json({ success: true, data: speakers });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch speakers.' });
  }
};

const createSpeaker = async (req, res) => {
  try {
    const speaker = await Speaker.create(req.body);
    res.status(201).json({ success: true, data: speaker });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create speaker.' });
  }
};

const updateSpeaker = async (req, res) => {
  try {
    const speaker = await Speaker.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!speaker) return res.status(404).json({ success: false, message: 'Speaker not found.' });
    res.json({ success: true, data: speaker });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update speaker.' });
  }
};

const deleteSpeaker = async (req, res) => {
  try {
    const speaker = await Speaker.findByIdAndDelete(req.params.id);
    if (!speaker) return res.status(404).json({ success: false, message: 'Speaker not found.' });
    res.json({ success: true, message: 'Speaker deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete speaker.' });
  }
};

// ----- SCHEDULE CRUD -----

const getScheduleItems = async (req, res) => {
  try {
    const items = await Schedule.find().sort('order');
    res.json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch schedule.' });
  }
};

const createScheduleItem = async (req, res) => {
  try {
    const item = await Schedule.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create schedule item.' });
  }
};

const updateScheduleItem = async (req, res) => {
  try {
    const item = await Schedule.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!item) return res.status(404).json({ success: false, message: 'Schedule item not found.' });
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update schedule item.' });
  }
};

const deleteScheduleItem = async (req, res) => {
  try {
    const item = await Schedule.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Schedule item not found.' });
    res.json({ success: true, message: 'Schedule item deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete schedule item.' });
  }
};

// ----- EVENT UPDATE -----

const updateEvent = async (req, res) => {
  try {
    let event = await Event.findOne();
    if (!event) {
      event = await Event.create(req.body);
    } else {
      Object.assign(event, req.body);
      await event.save();
    }
    res.json({ success: true, data: event });
  } catch (error) {
    console.error('Update event error:', error);
    res.status(500).json({ success: false, message: 'Failed to update event.' });
  }
};

module.exports = {
  loginAdmin,
  getDashboardStats,
  getParticipants,
  exportParticipants,
  getSpeakers,
  createSpeaker,
  updateSpeaker,
  deleteSpeaker,
  getScheduleItems,
  createScheduleItem,
  updateScheduleItem,
  deleteScheduleItem,
  updateEvent
};
