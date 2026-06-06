if (typeof globalThis.crypto === 'undefined') {
  globalThis.crypto = require('crypto').webcrypto;
}

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Property = require('../models/Property');

const cleanDatabase = async () => {
  console.log('⏳ Connecting to database...');
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB.');

    console.log('🧹 Clearing properties collection...');
    const deletedProps = await Property.deleteMany({});
    console.log(`🗑️ Deleted ${deletedProps.deletedCount} properties.`);

    console.log('🧹 Clearing users collection...');
    const deletedUsers = await User.deleteMany({});
    console.log(`🗑️ Deleted ${deletedUsers.deletedCount} users.`);

    console.log('✨ Database cleared successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error cleaning database:', error.message);
    process.exit(1);
  }
};

cleanDatabase();
