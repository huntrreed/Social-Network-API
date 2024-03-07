require('dotenv').config();
const express = require('express');
const db = require('./config/connection');
const userRoutes = require('./routes/api/userRoutes');
const thoughtRoutes = require('./routes/api/thoughtRoutes');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Middleware to parse URL-encoded bodies. 
app.use(express.urlencoded({ extended: true })); 


// API routes
app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);

// Similar to event listener, turning express server on once database is running
db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });