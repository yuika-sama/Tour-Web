const express = require('express');
const router = express.Router();
const { createReview, getReviewById, updateReview, deleteReview, getAllReviews, getReviewsByTourId, getReviewsByUserId } = require('../controllers/reviews.controller');

// GET routes
router.get('/', getAllReviews);
router.get('/tour/:id', getReviewsByTourId);
router.get('/user/:id', getReviewsByUserId);
router.get('/:id', getReviewById);

// POST route
router.post('/', createReview);

// PUT route
router.put('/:id', updateReview);

// DELETE route
router.delete('/:id', deleteReview);

module.exports = router;