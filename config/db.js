const mongoose = require('mongoose');
const { MONGODB_URI } = require('./env');

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return true;

  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000 // 5 seconds timeout if MongoDB isn't running
    });
    isConnected = true;
    console.log(`🍃 MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
    return true;
  } catch (err) {
    console.warn(`⚠️ MongoDB Connection Warning: ${err.message}`);
    console.warn(`💡 Backend operating with live in-memory persistent cache fallback.`);
    isConnected = false;
    return false;
  }
};

const getIsConnected = () => isConnected;

module.exports = {
  connectDB,
  getIsConnected
};
