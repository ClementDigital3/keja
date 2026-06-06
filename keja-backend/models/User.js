const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 8,
    select: false, // Prevents returning password hash by default
  },
  role: {
    type: String,
    required: true,
    enum: ['tenant', 'landlord'],
  },
  phone: {
    type: String,
    required: [true, 'Please add a phone number'],
  },
  idNumber: {
    type: String,
    default: null,
  },
  subscriptionPaid: {
    type: Boolean,
    default: false,
  },
  subscriptionExpiry: {
    type: Date,
    default: null,
  },
  houseFound: {
    type: Boolean,
    default: false,
  },
  registeredAt: {
    type: Date,
    default: Date.now,
  }
});

// Encrypt password using bcrypt before save
userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
