require('dotenv').config();
const express = require('express');
const db = require('./config/connection');
const userRoutes = require('./routes/api/userRoutes');
const thoughtRoutes = require('./routes/api/thoughtRoutes');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Note to me --Middleware to parse URL-encoded bodies. Might not need this? Grabbed from mini project not sure yet if important
app.use(express.urlencoded({ extended: true })); 


// API routes
app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);


db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });