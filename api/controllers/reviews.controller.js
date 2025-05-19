const Review = require('../models/reviews.model');

const createReview = async (req, res) => {
    const review = req.body;
    if (!review.user_id || !review.tour_id || !review.rating || !review.comment || !review.review_date) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const newReview = await Review.createReview(review);
    res.status(201).json(newReview);
};  

const getReviewById = async (req, res) => {
    const reviewId = req.params.id;
    if (!reviewId) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const review = await Review.getReviewById(reviewId);
    res.status(200).json(review);
};    

const updateReview = async (req, res) => {
    const reviewId = req.params.id;
    if (!reviewId) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const review = req.body;
    if (!review) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const updatedReview = await Review.updateReview(reviewId, review);
    res.status(200).json(updatedReview);
};    

const deleteReview = async (req, res) => {
    const reviewId = req.params.id;
    if (!reviewId) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const deletedReview = await Review.deleteReview(reviewId);
    res.status(200).json(deletedReview);
};    

const getAllReviews = async (req, res) => {
    const reviews = await Review.getAllReviews();
    if (!reviews) {
        return res.status(404).json({ error: 'Reviews not found' });
    }
    res.status(200).json(reviews);
};      

const getReviewsByTourId = async (req, res) => {
    const tourId = req.params.id;
    if (!tourId) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const reviews = await Review.getReviewsByTourId(tourId);
    res.status(200).json(reviews);
};      

const getReviewsByUserId = async (req, res) => {
    const userId = req.params.id;
    if (!userId) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const reviews = await Review.getReviewsByUserId(userId);
    res.status(200).json(reviews);
};        

module.exports = {
    createReview,
    getReviewById,
    updateReview,
    deleteReview,
    getAllReviews,
    getReviewsByTourId,
    getReviewsByUserId
};