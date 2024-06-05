const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    igdbId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    coverUrl: { type: String },
});

module.exports = mongoose.model('Game', GameSchema);

