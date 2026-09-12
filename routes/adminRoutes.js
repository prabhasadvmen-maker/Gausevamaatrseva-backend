const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// GET /api/admin/stats
router.get('/stats', adminController.getStats);

// GET /api/admin/charts
router.get('/charts', adminController.getCharts);

// GET & POST /api/admin/donations
router.get('/donations', adminController.getDonations);
router.post('/donations', adminController.addManualDonation);

// POST /api/admin/sevas (Add New Seva Package)
router.post('/sevas', adminController.addSevaPackage);

// GET /api/admin/users
router.get('/users', adminController.getUsers);

// GET & PUT /api/admin/settings
router.get('/settings', adminController.getSettings);
router.put('/settings', adminController.updateSettings);

// GET /api/admin/help
router.get('/help', adminController.getHelp);

module.exports = router;
