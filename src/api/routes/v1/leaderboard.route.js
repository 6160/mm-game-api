const express = require('express');
const controller = require('../../controllers/leaderboard.controller')

const router = express.Router();


/**
 * @api {get} v1/leaderboard Leaderboard
 * @apiDescription Get leaderboard
 * @apiVersion 1.0.0
 * @apiName Leaderboard
 * @apiPermission public
 * @apiGroup Leaderboard
 *
 * @apiSuccess {Object[]}  scores   List of users with score.
 * @apiSuccess {Int} scores.score   score value
 * @apiSuccess {String} scores.name    player name
 *
 * @apiError (Internal Server Error 500)  {String} error  Error message
 */
router.get('/', controller.getLeaderboard);

/**
 * @api {post} v1/leaderboard Save/Update Player Score
 * @apiDescription Save or Update Player score
 * @apiVersion 1.0.0
 * @apiName UpdatePlayerScore
 * @apiPermission public
 * @apiGroup Leaderboard
 *
 * @apiParam  {Int}         score     Player Score
 * @apiParam {String}   name    Player Name
 * 
 * @apiError (Internal Server Error 500)  {String} error  Error message
 */
router.post('/', controller.savePlayerScore); 

/**
 * @api {get} v1/leaderboard/:name Player Score
 * @apiDescription Get player current score
 * @apiVersion 1.0.0
 * @apiName PlayerScore
 * @apiPermission public
 * @apiGroup Leaderboard
 * 
 * @apiSuccess {Object}  score  Object with the user score.
 * @apiSuccess {Int} score.score   score value
 * @apiSuccess {String} score.name    player name
 * 
 * @apiError (Internal Server Error 500)  {String} error  Error message
 */
router.get('/:name', controller.getPlayerScore);

module.exports = router;
