const jwt = require('jsonwebtoken');
const db = require('../models/index.cjs');
require('dotenv').config();

const secretKey = process.env.SECRET_KEY || 'raftel'; // Use the same secret key used to sign the token

// Function to generate a token
const generateToken = (userId) => {
  return jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
};

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = decoded; // Attach the decoded token to the request object
    next();
  });
};

module.exports = { generateToken, authenticateToken };