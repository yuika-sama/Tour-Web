const express = require('express');
const router = express.Router();
const { createReview, getReviewById, updateReview, deleteReview, getAllReviews, getReviewsByTourId, getReviewsByUserId } = require('../controllers/reviews.controller');

router.post('/', createReview);
router.get('/:id', getReviewById);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);
router.get('/', getAllReviews);
router.get('/tour/:id', getReviewsByTourId);
router.get('/user/:id', getReviewsByUserId);

module.exports = router;