const axios = require('axios');
require('dotenv').config();

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
