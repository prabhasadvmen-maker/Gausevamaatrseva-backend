const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');

// POST /api/admin/login
router.post('/login', authController.login);

// GET /api/admin/me (Protected)
router.get('/me', authenticateToken, authController.getCurrentUser);

// GET /api/admin/credentials-info
router.get('/credentials-info', authController.getCredentialsInfo);

module.exports = router;
