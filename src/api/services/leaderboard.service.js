const DB = require('../../config/sqlite3').leaderboard;

exports.getLeaderboard = async () => {
    const query = 'SELECT * FROM leaderboard ORDER BY score desc;'
    const result = await DB.all(query);

    return result;
}

exports.getScore = async (playerName) => {
    const query = `SELECT * FROM leaderboard WHERE name = '${playerName}';`;
    const result = await DB.get(query);
    
    return result;
}

exports.saveScore = async (player) => {
    const query = `INSERT INTO leaderboard (name, score) values (?,?) ON CONFLICT(name) DO UPDATE SET score=excluded.score;`
    await DB.run(query, [player.name, player.score]);
    
    return player;
}