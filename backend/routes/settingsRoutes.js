const express = require('express');
const router = express.Router();
const {
  getSettingsMenus,
  getSettingsPages,
  getSettingsPageBySlug,
  getSubscriptionPlans
} = require('../controllers/settingsController');

// Settings Menu
router.get('/settings-menu', getSettingsMenus);

// Settings Pages
router.get('/settings-pages', getSettingsPages);
router.get('/settings-pages/slug/:slug', getSettingsPageBySlug);

// Subscription Plans
router.get('/subscription-plans', getSubscriptionPlans);

module.exports = router;
