const express = require('express')

const router = express.Router()
const gameController = require('../controllers/gameController')

router.get('/default', gameController.defaultGames)
router.get('/categories', gameController.gameCategories)
router.get('/search', gameController.searchGames)
router.get('/details', gameController.getGameDetails)
router.post('/twitchauth', gameController.twitchAuth)
module.exports = router