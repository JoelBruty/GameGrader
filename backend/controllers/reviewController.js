const Review = require('../models/Review');
const Game = require('../models/Game');

exports.createReview = async (req, res) => {
    const { gameId, reviewText, rating } = req.body;
    const userId = req.user.id;

    try {
        const game = await Game.findOne({ igdbId: gameId });
        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }

        const review = new Review({
            game: gameId,
            user: userId,
            reviewText,
            rating,
        });
        await review.save();
        res.status(201).json(review);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getReviews = async (req, res) => {
    try {
        const reviews = await Review.find().populate('user', 'username');
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id).populate('user', 'username');
        if (!review) return res.status(404).json({ message: 'Review not found' });
        res.json(review);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateReview = async (req, res) => {
    const { reviewText, rating } = req.body;
    try {
        const review = await Review.findByIdAndUpdate(
            req.params.id,
            { reviewText, rating },
            { new: true }
        );
        if (!review) return res.status(404).json({ message: 'Review not found' });
        res.json(review);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        if (!review) return res.status(404).json({ message: 'Review not found' });
        res.json({ message: 'Review deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

