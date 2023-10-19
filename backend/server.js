require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const groceryRoutes = require('./routes/groceries');
const userRoutes = require('./routes/user');

// Creates an express app
const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use('/api/groceries', groceryRoutes);
app.use('/api/user', userRoutes);

// Connect to DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // Listen for requests
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  })

  .catch((error) => {
    console.log(error);
  });

