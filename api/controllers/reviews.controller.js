const { createReview, getReviewById, updateReview, deleteReview, getAllReviews, getReviewsByUserId, getReviewsByTourId, getReviewsByRating, getReviewsByComment, getReviewsByReviewDate } = require('../models/reviews.model');

const createReviewController = async (req, res) => {
    const reviewData = req.body;
    const reviewId = await createReview(reviewData);
    res.status(201).json({ message: 'Review created successfully', reviewId });
};

const getReviewByIdController = async (req, res) => {
    const reviewId = req.params.reviewId;
    const review = await getReviewById(reviewId);
    res.status(200).json(review);
};

const updateReviewController = async (req, res) => {
    const reviewId = req.params.reviewId;
    const reviewData = req.body;
    const review = await updateReview(reviewId, reviewData);
    res.status(200).json(review);
};  

const deleteReviewController = async (req, res) => {
    const reviewId = req.params.reviewId;
    const review = await deleteReview(reviewId);
    res.status(200).json(review);
};  

const getAllReviewsController = async (req, res) => {
    const reviews = await getAllReviews();
    res.status(200).json(reviews);
};

const getReviewsByUserIdController = async (req, res) => {
    const userId = req.params.userId;
    const reviews = await getReviewsByUserId(userId);
    res.status(200).json(reviews);
};

const getReviewsByTourIdController = async (req, res) => {
    const tourId = req.params.tourId;
    const reviews = await getReviewsByTourId(tourId);
    res.status(200).json(reviews);
};

const getReviewsByRatingController = async (req, res) => {
    const rating = req.params.rating;
    const reviews = await getReviewsByRating(rating);
    res.status(200).json(reviews);
};

const getReviewsByCommentController = async (req, res) => {
    const comment = req.params.comment;
    const reviews = await getReviewsByComment(comment);
    res.status(200).json(reviews);
};

const getReviewsByReviewDateController = async (req, res) => {
    const reviewDate = req.params.reviewDate;
    const reviews = await getReviewsByReviewDate(reviewDate);
    res.status(200).json(reviews);
};

module.exports = {
    createReviewController,
    getReviewByIdController,
    updateReviewController,
    deleteReviewController,
    getAllReviewsController,
    getReviewsByUserIdController,
    getReviewsByTourIdController,
    getReviewsByRatingController,
    getReviewsByCommentController,
    getReviewsByReviewDateController    
};      