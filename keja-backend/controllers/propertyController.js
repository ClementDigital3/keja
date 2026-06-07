const Property = require('../models/Property');

// @desc    Get all properties with optional query filters
// @route   GET /api/properties
// @access  Public
const getProperties = async (req, res) => {
  try {
    const query = {};

    // Filter by location (case-insensitive regex search)
    if (req.query.location) {
      query.location = { $regex: req.query.location, $options: 'i' };
    }

    // Filter by city
    if (req.query.city) {
      query.city = { $regex: req.query.city, $options: 'i' };
    }

    // Filter by property type
    if (req.query.type) {
      query.type = req.query.type;
    }

    // Filter by beds
    if (req.query.beds) {
      query.beds = parseInt(req.query.beds);
    }

    // Filter by price range
    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice) query.price.$gte = parseInt(req.query.minPrice);
      if (req.query.maxPrice) query.price.$lte = parseInt(req.query.maxPrice);
    }

    // Only get available properties by default unless specified otherwise
    if (req.query.available !== undefined) {
      query.available = req.query.available === 'true';
    }

    const properties = await Property.find(query).populate('landlord', 'name phone email').sort({ postedAt: -1 });

    return res.status(200).json({
      success: true,
      count: properties.length,
      properties,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get single property details
// @route   GET /api/properties/:id
// @access  Public
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('landlord', 'name phone email');

    if (!property) {
      return res.status(404).json({ success: false, error: 'Property not found' });
    }

    return res.status(200).json({
      success: true,
      property,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Create a new property listing
// @route   POST /api/properties
// @access  Private (Landlords only)
const createProperty = async (req, res) => {
  try {
    const {
      title, type, beds, baths, sqft, desc,
      location, city, address, price, deposit, minLease,
      utilities, pets, imgUrl, contactPhone, contactName, amenities
    } = req.body;

    if (!title || !type || !beds || !baths || !desc || !location || !city || !address || !price || !contactPhone || !contactName) {
      return res.status(400).json({ success: false, error: 'Please enter all required fields' });
    }

    const property = await Property.create({
      title, type, beds: parseInt(beds), baths: parseInt(baths), sqft: parseInt(sqft) || 0,
      desc, location, city, address, price: parseInt(price), deposit: parseInt(deposit) || 1,
      minLease: parseInt(minLease) || 6, utilities, pets: pets === true || pets === 'true',
      imgUrl, contactPhone, contactName, landlord: req.user.id,
      amenities: amenities || [],
      verified: false, // Default unverified until documents uploaded
    });

    return res.status(201).json({
      success: true,
      property,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Delete a property listing
// @route   DELETE /api/properties/:id
// @access  Private (Landlords only)
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ success: false, error: 'Property not found' });
    }

    // Ensure user owns this property
    if (property.landlord.toString() !== req.user.id) {
      return res.status(401).json({ success: false, error: 'User not authorized to delete this listing' });
    }

    await property.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Property listing removed',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { getProperties, getPropertyById, createProperty, deleteProperty };
