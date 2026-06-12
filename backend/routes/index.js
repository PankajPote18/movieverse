const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const movieRoutes = require('./movieRoutes');
const settingsRoutes = require('./settingsRoutes');

router.use('/auth', authRoutes);
router.use('/', movieRoutes); // contains /movies and /categories
router.use('/', settingsRoutes); // contains settings and plans

module.exports = router;
