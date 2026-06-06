const User = require('../models/User');

// @desc    Mark tenant's search as successful (house found) and expire access
// @route   POST /api/tenant/house-found
// @access  Private (Tenants only)
const houseFound = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    if (user.role !== 'tenant') {
      return res.status(400).json({ success: false, error: 'Only tenants can manage search states' });
    }

    user.houseFound = true;
    user.subscriptionPaid = false; // Expire access
    
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Congratulations! Your search has been successfully closed.',
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

// @desc    Reset tenant's search so they can start a new search
// @route   POST /api/tenant/reset-search
// @access  Private (Tenants only)
const resetSearch = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    if (user.role !== 'tenant') {
      return res.status(400).json({ success: false, error: 'Only tenants can manage search states' });
    }

    user.houseFound = false;
    user.subscriptionPaid = false;
    user.subscriptionExpiry = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Search state reset. You can now start a new house hunt.',
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

module.exports = { houseFound, resetSearch };
