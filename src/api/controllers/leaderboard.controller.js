const leaderboardService = require('../services/leaderboard.service');

exports.getLeaderboard = async (req, res) => {
    const leaderboard =  await leaderboardService.getLeaderboard();
    res.json(leaderboard);
}

exports.getPlayerScore = async (req, res) => {
    const score = await leaderboardService.getScore(req.params.name);
    res.json(score);
}

exports.savePlayerScore = async (req, res) => {
    const player = {
        name: req.body.name,
        score: req.body.score,
    }

    const success = leaderboardService.saveScore(player).catch(e => {
        res.status(500).json({ error: 'Something went wrong while saving score.' })
    })

    res.json(success);
}

