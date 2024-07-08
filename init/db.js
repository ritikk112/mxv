const mongoose = require('mongoose'),
  mongoURI = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));
