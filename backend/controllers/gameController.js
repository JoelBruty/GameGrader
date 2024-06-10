const axios = require('axios');
require('dotenv').config();

exports.twitchAuth = async (req, res) => { //POST http://localhost:4000/game/twitchauth
    try {
        const response = await axios.post(
            'https://id.twitch.tv/oauth2/token',
            `client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`,
        );

        res.json(response.data);
        console.log("Twitch access token:", response.data.access_token)
        console.log("Expires in (seconds):", response.data.expires_in)
        process.env.TWITCH_ACCESS_TOKEN = response.data.access_token
        process.env.TWITCH_ACCESS_EXPIRES = response.data.expires_in
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.defaultGames = async (req, res) => { //GET http://localhost:4000/game/search?query=Mario
    try {
        const response = await axios.post(
            'https://api.igdb.com/v4/games',
            `fields name, cover.url;`,
            {
                headers: {
                    'Client-ID': process.env.TWITCH_CLIENT_ID,
                    'Authorization': `Bearer ${process.env.TWITCH_ACCESS_TOKEN}`,
                },
            }
        );

        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.gameCategories = async (req, res) => { //GET http://localhost:4000/game/search?query=Mario
    const { query } = req.query;

    //WIP

    try {
        const response = await axios.post(
            'https://api.igdb.com/v4/games',
            `fields name, cover.url; where game.genres = ${query}`,
            {
                headers: {
                    'Client-ID': process.env.TWITCH_CLIENT_ID,
                    'Authorization': `Bearer ${process.env.TWITCH_ACCESS_TOKEN}`,
                },
            }
        );

        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.searchGames = async (req, res) => { //GET http://localhost:4000/game/search?query=Mario
    const { query } = req.query;

    try {
        const response = await axios.post(
            'https://api.igdb.com/v4/games',
            `search "${query}"; fields name, cover.url;`,
            {
                headers: {
                    'Client-ID': process.env.TWITCH_CLIENT_ID,
                    'Authorization': `Bearer ${process.env.TWITCH_ACCESS_TOKEN}`,
                },
            }
        );

        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getGameDetails = async (req, res) => { //GET http://localhost:4000/game/details?id=84920
    const { id } = req.query;

    try {
        const response = await axios.post(
            'https://api.igdb.com/v4/games',
            `fields id, name, collection.name, genres.name, cover.image_id, involved_companies.company.name, platforms.name, release_dates.human, release_dates.platform.name, release_dates.region, summary, websites.url, websites.trusted, similar_games.name; where id = ${id};`,
            {
                headers: {
                    'Client-ID': process.env.TWITCH_CLIENT_ID,
                    'Authorization': `Bearer ${process.env.TWITCH_ACCESS_TOKEN}`,
                },
            }
        );

        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};