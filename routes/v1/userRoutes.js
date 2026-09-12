const express = require('express');
const router = express.Router();
const userController = require('../../controllers/v1/userController');
const { authenticateV1Token } = require('../../middleware/v1AuthMiddleware');

// API-11: Get User Profile
router.get('/profile', authenticateV1Token, userController.getUserProfile);

// API-12: Update User Profile Details
router.put('/profile', authenticateV1Token, userController.updateUserProfile);

module.exports = router;
