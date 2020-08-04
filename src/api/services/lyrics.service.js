const fetch = require('node-fetch');
const URLSearchParams = require('url').URLSearchParams;

const DB = require('../../config/sqlite3').cache;
const { apiBaseUrl, apiKey, cachedWrongArtists, cachedTracks } = require('../../config/vars');

const wrongArtists = [];

const generateRandomArray = (size, maxValue) => {
    const arr = [];
    
    while(arr.length < size){
        const r = Math.floor(Math.random() * maxValue) + 1;
        if(arr.indexOf(r) === -1) arr.push(r);
    }
    
    return arr;
}


exports.getLyrics = async (pageSize = 10) => {
    if (wrongArtists.length === 0) await fetchRandomArtists().catch(e => { throw new Error('Unable to fetch artists.')});
    
    const availableTracksQuery = 'SELECT id from tracks;'
    const availableTracks = await DB.all(availableTracksQuery);
    
    if (availableTracks.length < pageSize) {
        await fetchTracks();
        return this.getLyrics(pageSize);
    }

    const randomArray = generateRandomArray(pageSize, availableTracks.length - 1);
    const trackIdArray = randomArray.map(index => availableTracks[index].id)
    
    const tracks = await DB.all(`SELECT * FROM tracks WHERE id IN (${trackIdArray});`)
    await DB.run(`DELETE  FROM tracks WHERE id IN (${trackIdArray});`)

    tracks.forEach(t => t.wrong = t.wrong.split('-----'));

    return tracks;
};

const fetchTracks = async () => {
    const method = 'chart.tracks.get'
    const apiUrl = `${apiBaseUrl}${method}?`
    
    const params = {
        page_size: cachedTracks,
        chart_name: 'mxmweekly',
        f_has_lyrics: 1,
        apikey: apiKey,
    }

    const URL = apiUrl + new URLSearchParams(params)

    const response = await fetch(URL).catch(e => { throw new Error('Unable to fetch tracks.')});
    const json = await response.json();

    json.message.body.track_list.forEach(async (trackEntry, index) => {
        const toSave = {};

        toSave.correct = trackEntry.track.artist_name;
        toSave.lyric = await fetchLyric(trackEntry.track.commontrack_id);
        toSave.wrong = getWrongArtists(toSave.correct);

        await saveTrack(toSave);
    })

}


const saveTrack = async (track) => {
    const query = `INSERT INTO tracks VALUES (null, ?, ?, ?);`
    await DB.run(query, [track.lyric, track.correct, `${track.wrong[0]}-----${track.wrong[1]}`]);
}

const getRandomLyricSnippet = (lyricsBody) => {
    const randomIndex = Math.floor(Math.random() * (lyricsBody.length - 1))
    const randomSnippet = lyricsBody[randomIndex];
    return randomSnippet;
}

const fetchLyric = async (commontrack_id) => {
    const method = 'track.lyrics.get'
    const wrongSnippets = ['******* This Lyrics is NOT for Commercial use *******', '...', ''];

    const apiUrl = `${apiBaseUrl}${method}?`    
    const params = { commontrack_id , apikey: apiKey};
    const URL = apiUrl + new URLSearchParams(params)

    const response = await fetch(URL).catch(e => { throw new Error('Unable to fetch lyrics.')});
    const json = await response.json();

    const lyricsBody = json.message.body.lyrics.lyrics_body.split('\n').filter(s => wrongSnippets.indexOf(s) < 0);

    const lyricSnippet = getRandomLyricSnippet(lyricsBody);

    return lyricSnippet;
}

const fetchRandomArtists = async () => {
    const method = 'chart.artists.get'

    const apiUrl = `${apiBaseUrl}${method}?`
    const params = { page_size: cachedWrongArtists , apikey: apiKey};
    const URL = apiUrl + new URLSearchParams(params)

    const response = await fetch(URL);
    const json = await response.json();

    const artistsList = json.message.body.artist_list

    artistsList.forEach(artistEntry => {
        wrongArtists.push(artistEntry.artist.artist_name);
    })
}

const getRandomArtist = (rightArtist) => {
    const index = Math.floor(Math.random() * 200);
    const wrong = wrongArtists[index];
    
    if (!wrong || wrong === rightArtist) return getRandomArtist(rightArtist);
    return wrong;
}


const getWrongArtists = (rightArtist) => {
    const artist1 = getRandomArtist(rightArtist);
    const artist2 = getRandomArtist(rightArtist);

    return [artist1, artist2];
}
