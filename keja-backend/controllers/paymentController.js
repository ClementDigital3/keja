const User = require('../models/User');

// @desc    Simulate M-Pesa STK Push
// @route   POST /api/payments/stkpush
// @access  Private
const stkPush = async (req, res) => {
  try {
    const { phone, amount } = req.body;

    if (!phone || !amount) {
      return res.status(400).json({ success: false, error: 'Phone number and amount are required' });
    }

    // Simulate Daraja API STK push delay
    return res.status(200).json({
      success: true,
      message: `STK push prompt sent successfully to ${phone}. Please enter your M-Pesa pin on your phone.`,
      MerchantRequestID: Math.random().toString(36).substr(2, 9).toUpperCase(),
      CheckoutRequestID: Math.random().toString(36).substr(2, 9).toUpperCase(),
      ResponseCode: '0',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Verify M-Pesa confirmation code and activate subscription
// @route   POST /api/payments/verify
// @access  Private
const verifyMpesa = async (req, res) => {
  try {
    const { mpesaCode } = req.body;

    if (!mpesaCode) {
      return res.status(400).json({ success: false, error: 'M-Pesa confirmation code is required' });
    }

    // Simple Kenyan M-Pesa format regex validation (10 chars e.g. RG7KL1MXYZ)
    const mpesaRegex = /^[A-Z0-9]{8,12}$/i;
    if (!mpesaRegex.test(mpesaCode.trim())) {
      return res.status(400).json({ success: false, error: 'Invalid M-Pesa code format. Check your SMS.' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    // If tenant, activate a 30-day access subscription and reset houseFound flag
    if (user.role === 'tenant') {
      const expiry = new Date();
      expiry.setDate(expiry.getDate() + 30); // 30 days from now

      user.subscriptionPaid = true;
      user.subscriptionExpiry = expiry;
      user.houseFound = false;

      await user.save();

      return res.status(200).json({
        success: true,
        message: 'Tenant subscription activated successfully for 30 days!',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          subscriptionPaid: user.subscriptionPaid,
          subscriptionExpiry: user.subscriptionExpiry,
          houseFound: user.houseFound,
        },
      });
    }

    // If landlord, they are already active but we log transaction
    return res.status(200).json({
      success: true,
      message: 'M-Pesa payment verification logged successfully.',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
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

module.exports = { stkPush, verifyMpesa };
