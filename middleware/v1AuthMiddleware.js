const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');
const { users } = require('../data/store');

/**
 * Mandatory Bearer JWT Authentication Middleware
 */
const authenticateV1Token = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Authentication token required',
      error_code: 'UNAUTHORIZED'
    });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired authentication token',
        error_code: 'UNAUTHORIZED'
      });
    }

    // Attach decoded user and full user profile from store if available
    const phone = decoded.phone;
    const userRecord = users.get(phone) || {
      id: decoded.id || `usr_${phone}`,
      phone: phone,
      country_code: decoded.country_code || '+91',
      name: decoded.name || 'Gousevak User',
      email: decoded.email || '',
      pan: decoded.pan || '',
      address: decoded.address || {}
    };

    req.user = userRecord;
    next();
  });
};

/**
 * Optional Bearer JWT Authentication Middleware
 * Does not block request if token is missing or invalid.
 */
const optionalV1Token = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    req.user = null;
    return next();
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      req.user = null;
    } else {
      const phone = decoded.phone;
      const userRecord = users.get(phone) || {
        id: decoded.id || `usr_${phone}`,
        phone: phone,
        country_code: decoded.country_code || '+91',
        name: decoded.name || 'Gousevak User'
      };
      req.user = userRecord;
    }
    next();
  });
};

module.exports = {
  authenticateV1Token,
  optionalV1Token
};
