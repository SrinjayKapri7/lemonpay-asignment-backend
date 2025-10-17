const mongoose = require('mongoose');

const connectDB = async () => {
  const dbUri = process.env.MONGO_URI;
  console.log("dbUri",dbUri)
  if (!dbUri) {
    console.error('MONGO_URI not defined in environment variables');
    return;
  }
  
  try {
    await mongoose.connect(dbUri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};


module.exports = connectDB;
