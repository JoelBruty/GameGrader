const User = require('../models/User');

exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.params.id || req.query.userId;
        // const user = await User.findById(userId).populate('reviews', 'game reviewText rating').select('-password');
        const user = await User.findById(userId).populate('reviews').select('-password');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const profileData = {
            _id: user._id,
            username: user.username,
            createdAt: user.createdAt,
            reviewCount: user.reviews.length,
            reviews: user.reviews
        };

        res.json(profileData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
