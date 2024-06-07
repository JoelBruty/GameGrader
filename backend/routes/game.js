const express = require('express')

const router = express.Router()
const gameController = require('../controllers/gameController')

router.get('/search', gameController.searchGames)
router.post('/twitchauth', gameController.twitchAuth)
module.exports = router