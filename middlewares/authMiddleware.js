const jwt = require('jsonwebtoken');
const { User } = require('../models');

const JWT_SECRET = 'tu_secreto_jwt';

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;