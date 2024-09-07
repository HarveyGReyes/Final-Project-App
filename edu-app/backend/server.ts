const express = require('express');
const cors = require('cors'); 
const cookieParser = require('cookie-parser');

import authRoutes from './routes/authRoutes';

const app = express();
app.use(cors({
  // origin: 'http://localhost:3000',
  // methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these methods
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
// Middleware to parse cookies
app.use(cookieParser());


// const SECRET_KEY = process.env.JWT_SECRET;
export const SECRET_KEY = "test";

app.use('/api', authRoutes);

// Set up the routes
const port = 3001;
app.listen(port, () => {
  console.log(`API server listening on port ${port}`);
});
