// 
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const myRouter = require('./routes/blogRoutes');
const userRouter = require('./routes/userRoutes');
const authenticateUser = require('./middelwar/userAuth');
const dotenv = require('dotenv');

const app = express();
app.use(express.json());
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
  });

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;
mongoose.connect(DATABASE_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.use('/users', userRouter);
app.use('/api', myRouter);

app.get('/', (req, res) => {
  res.send('Hello, I am Hind');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
