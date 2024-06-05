const express = require('express')

const router = express.Router()
const reviewController = require('../controllers/reviewController')

router.post('/create', reviewController.createReview)
router.delete('/delete/:id', reviewController.deleteReview)
router.patch('/update/:id', reviewController.updateReview)
router.get('/get/:id', reviewController.getReview)
router.get('/all', reviewController.getReviews)
module.exports = router