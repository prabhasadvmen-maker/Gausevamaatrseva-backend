const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const homeRoutes = require('./homeRoutes');
const sevaRoutes = require('./sevaRoutes');
const paymentRoutes = require('./paymentRoutes');
const donationRoutes = require('./donationRoutes');
const userRoutes = require('./userRoutes');

router.use('/auth', authRoutes);
router.use('/home', homeRoutes);
router.use('/sevas', sevaRoutes);
router.use('/payments', paymentRoutes);
router.use('/donations', donationRoutes);
router.use('/user', userRoutes);

module.exports = router;
