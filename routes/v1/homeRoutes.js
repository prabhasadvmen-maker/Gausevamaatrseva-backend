const express = require('express');
const router = express.Router();
const homeController = require('../../controllers/v1/homeController');
const { optionalV1Token } = require('../../middleware/v1AuthMiddleware');

// API-04: Get Home Dashboard & Hero Banner
router.get('/dashboard', optionalV1Token, homeController.getHomeDashboard);

module.exports = router;
