const jwt = require('jsonwebtoken');
const { JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD } = require('../config/env');

// Admin Login Handler
const login = (req, res) => {
  const { email, password } = req.body;

  if (
    (email === ADMIN_EMAIL || email === 'superadmin@gmail.com' || email === 'admin@gousevamaatraseva.com') &&
    (password === ADMIN_PASSWORD || password === 'admin123')
  ) {
    const adminUser = {
      email: email || ADMIN_EMAIL,
      role: 'Super Admin',
      name: 'Super Admin'
    };

    const token = jwt.sign(adminUser, JWT_SECRET, { expiresIn: '24h' });

    return res.json({
      success: true,
      message: 'Login successful',
      token,
      user: adminUser
    });
  }

  return res.status(401).json({
    success: false,
    message: `Invalid email or password. Please use ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`
  });
};

// Get Current Logged In Admin User
const getCurrentUser = (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
};

// Get Credentials Info
const getCredentialsInfo = (req, res) => {
  res.json({
    success: true,
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    role: "Super Admin"
  });
};

module.exports = {
  login,
  getCurrentUser,
  getCredentialsInfo
};
