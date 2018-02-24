const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');

const router = express.Router();

/**
 * GET status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET docs
 */
router.use('/docs', express.static('docs'));

router.use('/users', userRoutes);
router.use('/auth', authRoutes);

module.exports = router;
