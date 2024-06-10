const axios = require('axios');
const Game = require('../models/Game');
require('dotenv').config();

exports.searchGames = async (req, res) => {
  const { query } = req.query;

  try {
    let games = await Game.find({ name: new RegExp(query, 'i') });

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

