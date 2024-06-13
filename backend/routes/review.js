const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authMiddleware = require('../middleware/auth');

router.post('/create', authMiddleware, reviewController.createReview);
router.delete('/delete/:id', authMiddleware, reviewController.deleteReview);
router.patch('/update/:id', authMiddleware, reviewController.updateReview);
router.get('/get/:id', reviewController.getReview);
router.get('/all', reviewController.getReviews);
router.get('/game/:id', reviewController.getReviewsGame);

module.exports = router;
