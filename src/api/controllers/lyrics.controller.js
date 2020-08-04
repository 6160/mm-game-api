const lyricService = require('../services/lyrics.service');


exports.getLyrics = async (req, res) => {
    const lyrics = await lyricService.getLyrics(req.query.qty).catch(e => {
        res.status(500).json({ error: e.message })
    })

    res.json(lyrics);
}
