const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Helper: Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, idNumber, password, role } = req.body;

    if (!firstName || !lastName || !email || !phone || !password || !role) {
      return res.status(400).json({ success: false, error: 'Please enter all required fields' });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, error: 'User already exists with this email' });
    }

    // Create user
    const user = await User.create({
      name: `${firstName} ${lastName}`,
      email,
      phone,
      idNumber: role === 'landlord' ? idNumber : null,
      password,
      role,
    });

    if (user) {
      return res.status(201).json({
        success: true,
        token: generateToken(user._id),
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          idNumber: user.idNumber,
          role: user.role,
          subscriptionPaid: user.subscriptionPaid,
          subscriptionExpiry: user.subscriptionExpiry,
          houseFound: user.houseFound,
        },
      });
    } else {
      return res.status(400).json({ success: false, error: 'Invalid user data' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Please enter email and password' });
    }

    // Check for user (and explicitly select password hash)
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    return res.status(200).json({
      success: true,
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        idNumber: user.idNumber,
        role: user.role,
        subscriptionPaid: user.subscriptionPaid,
        subscriptionExpiry: user.subscriptionExpiry,
        houseFound: user.houseFound,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        idNumber: user.idNumber,
        role: user.role,
        subscriptionPaid: user.subscriptionPaid,
        subscriptionExpiry: user.subscriptionExpiry,
        houseFound: user.houseFound,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { signup, login, getMe };
