const pool = require('../config/database');

// @desc    Get all settings menus
// @route   GET /api/settings-menu
// @access  Public
const getSettingsMenus = async (req, res) => {
  try {
    const [menus] = await pool.query('SELECT * FROM settings_menu ORDER BY sort_order ASC');
    res.json(menus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all settings pages
// @route   GET /api/settings-pages
// @access  Public
const getSettingsPages = async (req, res) => {
  try {
    const [pages] = await pool.query('SELECT * FROM settings_pages');
    res.json(pages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get settings page by slug
// @route   GET /api/settings-pages/slug/:slug
// @access  Public
const getSettingsPageBySlug = async (req, res) => {
  try {
    const [pages] = await pool.query('SELECT * FROM settings_pages WHERE slug = ?', [req.params.slug]);
    if (pages.length === 0) return res.status(404).json({ message: 'Page not found' });
    res.json(pages[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all subscription plans
// @route   GET /api/subscription-plans
// @access  Public
const getSubscriptionPlans = async (req, res) => {
  try {
    const [plans] = await pool.query('SELECT * FROM subscription_plans ORDER BY sort_order ASC');
    res.json(plans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getSettingsMenus,
  getSettingsPages,
  getSettingsPageBySlug,
  getSubscriptionPlans
};
