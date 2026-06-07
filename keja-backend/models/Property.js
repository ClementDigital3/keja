const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a property title'],
    trim: true,
  },
  type: {
    type: String,
    required: [true, 'Please specify the property type'],
    enum: ['Apartment', 'Bedsitter', 'Studio', 'Townhouse', 'Maisonette', 'Villa', 'Bungalow'],
  },
  beds: {
    type: Number,
    required: [true, 'Please specify the number of bedrooms'],
  },
  baths: {
    type: Number,
    required: [true, 'Please specify the number of bathrooms'],
  },
  sqft: {
    type: Number,
    default: 0,
  },
  desc: {
    type: String,
    required: [true, 'Please add a property description'],
    minlength: [30, 'Description must be at least 30 characters'],
  },
  location: {
    type: String,
    required: [true, 'Please specify the location/neighbourhood'],
  },
  city: {
    type: String,
    required: [true, 'Please specify the city/town'],
  },
  address: {
    type: String,
    required: [true, 'Please specify the physical address or estate'],
  },
  price: {
    type: Number,
    required: [true, 'Please add a monthly rent price'],
  },
  deposit: {
    type: Number,
    default: 1, // Number of months of rent for deposit
  },
  minLease: {
    type: Number,
    default: 6, // In months
  },
  utilities: {
    type: String,
    default: 'Negotiable',
  },
  pets: {
    type: Boolean,
    default: false,
  },
  available: {
    type: Boolean,
    default: true,
  },
  amenities: {
    type: [String],
    default: [],
  },
  imgUrl: {
    type: String,
    default: '',
  },
  contactPhone: {
    type: String,
    required: [true, 'Please specify contact phone number'],
  },
  contactName: {
    type: String,
    required: [true, 'Please specify contact person name'],
  },
  landlord: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 0,
  },
  reviews: {
    type: Number,
    default: 0,
  },
  postedAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Property', propertySchema);
