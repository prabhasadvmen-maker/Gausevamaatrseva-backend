const express = require('express');
const router = express.Router();
const sevaController = require('../../controllers/v1/sevaController');

// GET /api/v1/sevas
router.get('/', sevaController.getAllSevas);

// API-06: Get Seva Details & Preset Amounts
router.get('/:seva_id', sevaController.getSevaById);

module.exports = router;
