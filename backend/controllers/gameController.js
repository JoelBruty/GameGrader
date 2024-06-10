const axios = require('axios');
const Game = require('../models/Game');
require('dotenv').config();

  const { query } = req.query;
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

exports.searchGames = async (req, res) => { //GET http://localhost:4000/game/search?query=Mario
    const { query } = req.query;

  try {
    let games = await Game.find({ name: query });

    if (games.length === 0) {
      games = await Game.find({ name: new RegExp(query, 'i') });
    }
    if (games.length === 0) {
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

      games = response.data.map(async gameData => {
        const newGame = new Game({
          igdbId: gameData.id,
          name: gameData.name,
          coverUrl: gameData.cover?.url,
        });
        await newGame.save();
        return newGame;
      });
      games = await Promise.all(games);
    }

    res.json(games);
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