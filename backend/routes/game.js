const express = require('express')

const router = express.Router()
const gameController = require('../controllers/gameController')

router.get('/search', gameController.searchGames)
module.exports = router