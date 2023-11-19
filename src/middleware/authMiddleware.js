const jwt = require('jsonwebtoken');
require("dotenv").config()

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Authentication failed. Token missing.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET); 
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed. Invalid token.' });
  }
};

module.exports = authMiddleware;
