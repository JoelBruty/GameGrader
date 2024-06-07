const axios = require('axios');
require('dotenv').config();

exports.twitchAuth = async (req, res) => {
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

exports.searchGames = async (req, res) => {
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

