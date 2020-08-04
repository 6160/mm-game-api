require('dotenv').config();

module.exports = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    leaderboardDbURI: process.env.LEADERBOARD_DB,
    cacheDbURI: process.env.CACHE_DB,
    apiKey: process.env.APIKEY,
    apiBaseUrl: process.env.API_BASEURL,
    cachedWrongArtists: process.env.CACHED_WRONG_ARTISTS,
    cachedTracks: process.env.CACHED_TRACKS,
};
