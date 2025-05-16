const express = require('express');
const router = express.Router();
const { createReviewController, getReviewByIdController, updateReviewController, deleteReviewController, getAllReviewsController, getReviewsByUserIdController, getReviewsByTourIdController, getReviewsByRatingController, getReviewsByCommentController, getReviewsByReviewDateController } = require('../controllers/reviews.controller');

router.post('/', createReviewController);
router.get('/:id', getReviewByIdController);
router.put('/:id', updateReviewController);
router.delete('/:id', deleteReviewController);
router.get('/', getAllReviewsController);
router.get('/user/:id', getReviewsByUserIdController);
router.get('/tour/:id', getReviewsByTourIdController);
router.get('/rating/:rating', getReviewsByRatingController);
router.get('/comment/:comment', getReviewsByCommentController);
router.get('/date/:date', getReviewsByReviewDateController);

module.exports = router;