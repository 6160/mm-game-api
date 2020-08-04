const express = require('express');
const leaderboardRoutes = require('./leaderboard.route');
const lyricsRoutes = require('./lyrics.route');

const router = express.Router();

router.use('/leaderboard', leaderboardRoutes);
router.use('/lyrics', lyricsRoutes);

module.exports = router;
