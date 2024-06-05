const express = require('express')

const router = express.Router()
const authController = require('../controllers/authController')

router.post('/register', authController.register)
router.get('/login', authController.login)
module.exports = router