const mongoose = require('mongoose');

// Wrapping Mongoose around local connection to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/socialnetworkdb');

// Export connection 
module.exports = mongoose.connection;