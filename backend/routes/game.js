const express = require('express')

const router = express.Router()
const gameController = require('../controllers/gameController')

router.get('/default', gameController.defaultGames)
router.get('/recent', gameController.recentGames)
router.get('/genre', gameController.gameGenre)
router.get('/genrelist', gameController.genreList)
router.get('/search', gameController.searchGames)
router.get('/details', gameController.getGameDetails)
router.post('/twitchauth', gameController.twitchAuth)
module.exports = router