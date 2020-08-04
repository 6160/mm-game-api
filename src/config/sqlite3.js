const sqlite3 = require('sqlite3');
const util = require('util');
const { leaderboardDbURI, cacheDbURI } = require('./vars');

const openDb = (uri) => {
    
    const db = new sqlite3.Database(uri);
    
    db.run = util.promisify(db.run);
    db.get = util.promisify(db.get);
    db.all = util.promisify(db.all);
    
    return db;
}

module.exports = {
    leaderboard: openDb(leaderboardDbURI),
    cache: openDb(cacheDbURI)
};