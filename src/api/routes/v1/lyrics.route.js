const express = require('express');
const controller = require('../../controllers/lyrics.controller');
const router = express.Router();


/**
 * @api {get} v1/lyrics/?qty=:qty Get Lyrics
 * @apiDescription Get a list of lyrics
 * @apiVersion 1.0.0
 * @apiName GetLyrics
 * @apiGroup Lyrics
 * @apiPermission public
 *
 * @apiParam  {Number{1-}}         [qty=10]     Lyrics quantity
 *
 * @apiSuccess {Object[]}   lyrics    List of lyric objects.
 * @apiSuccess {Number}   lyrics.id   Lyric snippet id.
 * @apiSuccess {String}   lyrics.lyric  Lyric snippet.
 * @apiSuccess {String}   lyrics.correct  Correct answer.
 * @apiSuccess {Object[]}   lyrics.wrong    List of string of wrong answers.
 * 
 * @apiError (Internal Server Error 500)  {String} error  Error message
 */
router.get('/', controller.getLyrics);

module.exports = router;
